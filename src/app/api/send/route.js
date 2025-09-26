// src/app/api/send/route.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name = "", email = "", phone = "", message = "" } = body;

    if (!process.env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500 }
      );
    }
    if (!process.env.EMAIL_TO) {
      return new Response(
        JSON.stringify({ error: "EMAIL_TO not configured" }),
        { status: 500 }
      );
    }

    // mail content
    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll(
        "\n",
        "<br/>"
      )}</p>
      <hr/>
      <p>Received: ${new Date().toLocaleString()}</p>
    `;

    const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const to = [process.env.EMAIL_TO];

    // ✅ mail send
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Zaigam Enterprises Client — ${name || "New message"}`,
      html,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
