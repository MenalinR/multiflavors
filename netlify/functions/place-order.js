// Places an order. Cash orders are confirmed (and emailed) immediately; card orders are
// saved as pending and the response carries the signed fields the browser needs to open
// PayHere. The PayHere merchant secret never leaves the server.
import { FieldValue } from "firebase-admin/firestore";
import {
  getDb, corsHeaders, md5Upper, sendOrderEmails, CURRENCY, DELIVERY_FEE, STORE_NAME, payhereMerchantId, payhereMerchantSecret, ALLOWED_ORIGINS,
} from "../lib/shared.js";

export const handler = async (event) => {
  const headers = corsHeaders(event.headers.origin);
  const reply = (statusCode, body) => ({
    statusCode,
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers };
  if (event.httpMethod !== "POST") return reply(405, { error: "Method not allowed" });

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return reply(400, { error: "Invalid request." });
  }
  const { name, email, phone, address, city, zipCode, deliveryMethod, paymentMethod, cartItems } = data;

  if (!name || !email || !phone) return reply(400, { error: "Name, email and phone are required." });
  if (!["ship", "pickup"].includes(deliveryMethod)) return reply(400, { error: "Choose a delivery method." });
  if (deliveryMethod === "ship" && (!address || !city)) return reply(400, { error: "Address and city are required." });
  if (!["card", "cash"].includes(paymentMethod)) return reply(400, { error: "Choose a payment method." });
  if (!Array.isArray(cartItems) || cartItems.length === 0) return reply(400, { error: "Your cart is empty." });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity) * Number(item.selectedValue),
    0
  );
  if (!Number.isFinite(subtotal) || subtotal <= 0) return reply(400, { error: "Invalid cart total." });
  const amount = (subtotal + (deliveryMethod === "ship" ? DELIVERY_FEE : 0)).toFixed(2);

  try {
    const db = getDb();
    const counterRef = db.doc("LastOrderNumber/orderCount");
    const orderRef = db.collection("orders").doc();
    const order = {
      name,
      email,
      phone,
      address: address || "",
      city: city || "",
      zipCode: zipCode || "",
      deliveryMethod,
      paymentMethod,
      cartItems,
      totalPrice: Number(amount),
      status: paymentMethod === "cash" ? "confirmed" : "pending_payment",
    };

    order.orderNumber = await db.runTransaction(async (tx) => {
      const snap = await tx.get(counterRef);
      const next = (snap.exists ? snap.data().lastOrderNumber : 0) + 1;
      tx.set(counterRef, { lastOrderNumber: next });
      tx.set(orderRef, { ...order, orderNumber: next, createdAt: FieldValue.serverTimestamp() });
      return next;
    });

    if (paymentMethod === "cash") {
      await sendOrderEmails(order);
      return reply(200, { orderNumber: order.orderNumber });
    }

    const merchantId = payhereMerchantId();
    const hash = md5Upper(
      merchantId + orderRef.id + amount + CURRENCY + md5Upper(payhereMerchantSecret())
    );
    const [firstName, ...rest] = name.trim().split(/\s+/);

    // The customer comes back to the checkout page from PayHere's hosted page.
    const siteUrl = ALLOWED_ORIGINS.includes(event.headers.origin) ? event.headers.origin : ALLOWED_ORIGINS[0];
    const sandbox = process.env.PAYHERE_SANDBOX !== "false";

    return reply(200, {
      orderNumber: order.orderNumber,
      checkoutUrl: `https://${sandbox ? "sandbox" : "www"}.payhere.lk/pay/checkout`,
      payment: {
        merchant_id: merchantId,
        return_url: `${siteUrl}/Checkout?payment=done`,
        cancel_url: `${siteUrl}/Checkout?payment=cancelled`,
        notify_url: `${process.env.URL}/.netlify/functions/payhere-notify`,
        order_id: orderRef.id,
        items: `${STORE_NAME} order #${order.orderNumber}`,
        amount,
        currency: CURRENCY,
        hash,
        first_name: firstName,
        last_name: rest.join(" ") || firstName,
        email,
        phone,
        address: deliveryMethod === "ship" ? address : "Store pickup",
        city: deliveryMethod === "ship" ? city : "Nugegoda",
        country: "Sri Lanka",
      },
    });
  } catch (error) {
    console.error("Failed to place order:", error);
    return reply(500, { error: "Could not place your order. Please try again." });
  }
};
