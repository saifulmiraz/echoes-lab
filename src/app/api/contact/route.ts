import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

interface LeadPayload {
  name?: string;
  email?: string;
  business?: string;
  project?: string;
  message?: string;
  company_url?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success for bots.
  if (body.company_url) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const project = body.project?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !project || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, build, and a short message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const inbox = process.env.LEAD_INBOX ?? site.email;
  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured yet — accept the lead and log it so nothing is lost.
  if (!apiKey) {
    console.info("[lead] new enquiry (Resend not configured):", {
      name,
      email,
      business,
      project,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const html = `
    <h2>New enquiry — ${escapeHtml(project)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${business ? `<p><strong>Business:</strong> ${escapeHtml(business)}</p>` : ""}
    <p><strong>Build:</strong> ${escapeHtml(project)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <onboarding@resend.dev>`,
        to: [inbox],
        reply_to: email,
        subject: `New enquiry: ${project} — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[lead] Resend error:", await res.text());
      return NextResponse.json(
        { error: "Couldn't send right now. Please email me directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[lead] send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send right now. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
