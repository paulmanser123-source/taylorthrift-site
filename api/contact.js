import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const { name, email, message } = req.body;

    // 📩 EMAIL TO YOU
    await resend.emails.send({
      from: "Taylor Thrift <info@taylorthrift.co.uk>",
      to: "info@taylorthrift.co.uk",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 📧 RECEIPT EMAIL TO USER
    await resend.emails.send({
      from: "Taylor Thrift <info@taylorthrift.co.uk>",
      to: email,
      subject: "We’ve received your message",
      html: `
        <h2>Thanks for contacting Taylor Thrift UK</h2>
        <p>Hi ${name},</p>
        <p>We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({ error: "Email failed to send" });
  }
}