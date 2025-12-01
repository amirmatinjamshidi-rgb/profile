import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
   
    const { name, email, message } = await req.json();

    
    const resend = new Resend(process.env.RESEND_API_KEY);


    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "amirmatinjamshidi@gmail.com", 
      subject: `New Message From ${name}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>📩 New Contact Form Message</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p style="margin-top: 16px;">
            <strong>Message:</strong><br/>
            ${message}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
