const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (to, name, order) => {
  const itemsHtml = order.orderItems
    .map(item => `<li>${item.name} × ${item.qty} — ₹${item.qty * item.price}</li>`)
    .join("");

  const html = `
    <h2>Hello ${name},</h2>
    <p>Thank you for shopping with <strong>GreenMart</strong>!</p>
    <p><strong>Your Order Summary:</strong></p>
    <ul>${itemsHtml}</ul>
    <p><strong>Total:</strong> ₹${order.totalPrice}</p>
    <p>We’ll notify you once your order is shipped.</p>
    <br/>
    <p>Best regards,<br/>GreenMart Team</p>
  `;

 return transporter.sendMail({
  from: `"GreenMart" <${process.env.EMAIL_USER}>`,
  to,
  subject: "✅ Order Confirmation - GreenMart",
  html,
}).then(() => {
  console.log("📧 Email sent successfully to", to);
}).catch(err => {
  console.error("❌ Failed to send email:", err.message);
});

 
};

module.exports = sendOrderConfirmationEmail;
