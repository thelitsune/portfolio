import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0), // Must be empty — bot trap
});

// Simple in-memory rate limit store (resets on cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3;

  const record = rateLimit.get(ip);
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data.' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = parsed.data;

    // Honeypot check (double safety)
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silent success for bots
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'your@email.com';

    if (!apiKey) {
      // Dev mode: log and return success
      console.log('Contact form submission (no API key set):', { name, email, subject });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e1e2e;">
          <div style="border-bottom: 1px solid #1e1e2e; padding-bottom: 24px; margin-bottom: 24px;">
            <h2 style="color: #a855f7; margin: 0 0 8px;">New Portfolio Contact</h2>
            <p style="color: #64748b; margin: 0; font-size: 14px;">Someone reached out through your portfolio</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 80px;">From</td><td style="padding: 8px 0; color: #e2e8f0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #a855f7;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Subject</td><td style="padding: 8px 0; color: #e2e8f0;">${subject}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #12121a; border-radius: 8px; border: 1px solid #1e1e2e;">
            <p style="color: #64748b; margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="color: #e2e8f0; margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; color: #64748b; font-size: 12px;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
