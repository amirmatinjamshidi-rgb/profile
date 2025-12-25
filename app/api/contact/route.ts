/** @format */

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "amirmatinjamshidi@gmail.com",
      subject: `New Message From ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4d194d;">📩 New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 16px; padding: 15px; background: #f4f4f4; border-radius: 8px;">
            <strong>Message:</strong><br/>
            ${message}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Request Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
