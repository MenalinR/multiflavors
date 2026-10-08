// PayHere calls this server-to-server after a card payment attempt. Only a verified
// status_code 2 with the right amount marks the order as paid and sends the emails.
import { getDb, md5Upper, sendOrderEmails, CURRENCY, payhereMerchantId, payhereMerchantSecret } from "../lib/shared.js";

const STATUSES = { 2: "paid", 0: "pending_payment", "-1": "cancelled", "-2": "payment_failed", "-3": "chargedback" };

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString() : event.body;
  const {
    merchant_id, order_id, payment_id, payhere_amount, payhere_currency, status_code, md5sig, method,
  } = Object.fromEntries(new URLSearchParams(raw || ""));

  const expectedSig = md5Upper(
    merchant_id + order_id + payhere_amount + payhere_currency + status_code +
      md5Upper(payhereMerchantSecret())
  );
  if (!md5sig || md5sig !== expectedSig || merchant_id !== payhereMerchantId()) {
    console.warn("Rejected PayHere notification with bad signature", { order_id });
    return { statusCode: 400, body: "Invalid signature" };
  }

  const orderRef = getDb().collection("orders").doc(order_id);
  const snap = await orderRef.get();
  if (!snap.exists) return { statusCode: 404, body: "Unknown order" };
  const order = snap.data();

  // Don't let a late/duplicate notification downgrade or re-email an order that is already paid.
  if (order.status === "paid") return { statusCode: 200, body: "OK" };

  let status = STATUSES[status_code] || "payment_failed";
  if (status === "paid" && (Number(payhere_amount) !== order.totalPrice || payhere_currency !== CURRENCY)) {
    console.error("PayHere amount mismatch", { order_id, payhere_amount, expected: order.totalPrice });
    status = "payment_mismatch";
  }

  const update = { status, paymentId: payment_id || null, cardType: method || null };
  await orderRef.update(update);
  if (status === "paid") await sendOrderEmails({ ...order, ...update });

  return { statusCode: 200, body: "OK" };
};
