// Shared helpers for the Netlify functions in netlify/functions/.
import crypto from "crypto";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import nodemailer from "nodemailer";

export const STORE_EMAIL = "multiflavours.store@gmail.com";
export const STORE_NAME = "Multi Flavours";
export const CURRENCY = "LKR";
export const DELIVERY_FEE = 350;

export const ALLOWED_ORIGINS = [
  "https://multiflavours.com",
  "https://www.multiflavours.com",
  "http://localhost:5173",
];

export const corsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});

export const md5Upper = (value) => crypto.createHash("md5").update(value).digest("hex").toUpperCase();

// Trimmed so a stray space or newline pasted into the Netlify settings can't break the hash.
export const payhereMerchantId = () => (process.env.PAYHERE_MERCHANT_ID || "").trim();
export const payhereMerchantSecret = () => (process.env.PAYHERE_MERCHANT_SECRET || "").trim();

// FIREBASE_SERVICE_ACCOUNT holds the full service-account JSON downloaded from
// Firebase Console > Project settings > Service accounts. Works on the free Spark plan.
export const getDb = () => {
  if (!getApps().length) {
    initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
  }
  return getFirestore();
};

const fmt = (value) => Number(value || 0).toLocaleString("en-LK", { maximumFractionDigits: 2 });

const buildOrderSummary = (order) => {
  const itemLines = (order.cartItems || [])
    .map(
      (item) =>
        `- ${item.name} (${item.quantity} x ${item.selectedValue}${item.type === "weight" ? "g" : "pcs"})`
    )
    .join("\n");

  const deliveryLine =
    order.deliveryMethod === "ship"
      ? `Ship to: ${order.address}, ${order.city} ${order.zipCode}`.trim()
      : "Pick up from store";

  const paymentLine =
    order.paymentMethod === "card"
      ? `Paid by card via PayHere (payment ID ${order.paymentId})`
      : `Cash payment: Rs ${fmt(order.totalPrice)} to collect ${
          order.deliveryMethod === "ship" ? "on delivery" : "at pickup"
        }`;

  return [
    `Order #${order.orderNumber}`,
    `Customer: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    deliveryLine,
    "",
    "Items:",
    itemLines,
    "",
    `Total: Rs ${fmt(order.totalPrice)}`,
    paymentLine,
  ].join("\n");
};

// Emails the store and the customer. Never throws: the order is already saved,
// so a mail problem is only logged.
export const sendOrderEmails = async (order) => {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.warn("GMAIL_APP_PASSWORD not set; skipping order emails");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: STORE_EMAIL, pass: process.env.GMAIL_APP_PASSWORD },
    });
    const summary = buildOrderSummary(order);

    await transporter.sendMail({
      from: `${STORE_NAME} <${STORE_EMAIL}>`,
      to: STORE_EMAIL,
      subject: `New order #${order.orderNumber} from ${order.name}`,
      text: summary,
    });

    if (order.email) {
      await transporter.sendMail({
        from: `${STORE_NAME} <${STORE_EMAIL}>`,
        to: order.email,
        subject: `Your ${STORE_NAME} order #${order.orderNumber}`,
        text: [
          `Hi ${order.name},`,
          "",
          "Thanks for your order! Here's a summary:",
          "",
          summary,
          "",
          "We'll be in touch soon.",
          "",
          "See you soon!",
        ].join("\n"),
      });
    }
  } catch (error) {
    console.error("Failed to send order emails:", error);
  }
};
