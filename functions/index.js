const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");
const STORE_EMAIL = "multiflavours.store@gmail.com";
const STORE_NAME = "Multi Flavours";

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
  ].join("\n");
};

exports.sendOrderEmails = onDocumentCreated(
  { document: "orders/{orderId}", secrets: [gmailAppPassword] },
  async (event) => {
    const order = event.data?.data();
    if (!order) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: STORE_EMAIL,
        pass: gmailAppPassword.value(),
      },
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
  }
);
