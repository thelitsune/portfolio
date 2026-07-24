import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000;
  const max = 3;
  const record = rateLimit.get(ip);
  if (!record || now > record.reset) { rateLimit.set(ip, { count: 1, reset: now + window }); return true; }
  if (record.count >= max) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    if (!checkRateLimit(ip)) return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });

    const body = await req.json();
    const { name, email, message, website } = body;

    if (website) return NextResponse.json({ success: true });

    if (!name?.trim() || !email?.trim() || !message?.trim())
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    if (message.length < 10 || message.length > 2000)
      return NextResponse.json({ error: 'Message must be 10–2000 characters.' }, { status: 400 });

    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.me.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#050a0e;font-family:monospace">
        <div style="max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0d1117;border:1px solid rgba(0,212,255,0.2);border-radius:16px;overflow:hidden">
            <div style="background:linear-gradient(135deg,rgba(0,212,255,0.15),rgba(124,58,237,0.15));padding:32px;border-bottom:1px solid rgba(0,212,255,0.1)">
              <h1 style="color:#00d4ff;margin:0;font-size:22px;letter-spacing:1px">&lt;Quinn.Portfolio /&gt;</h1>
              <p style="color:#64748b;margin:8px 0 0;font-size:13px">New contact form submission</p>
            </div>
            <div style="padding:32px">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:12px 0;border-bottom:1px solid #1f2937;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:2px;width:90px">From</td><td style="padding:12px 0;border-bottom:1px solid #1f2937;color:#e2e8f0;font-size:15px">${name}</td></tr>
                <tr><td style="padding:12px 0;border-bottom:1px solid #1f2937;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:2px">Email</td><td style="padding:12px 0;border-bottom:1px solid #1f2937"><a href="mailto:${email}" style="color:#00d4ff;text-decoration:none;font-size:15px">${email}</a></td></tr>
                <tr><td style="padding:12px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:2px;vertical-align:top">Message</td><td style="padding:12px 0;color:#e2e8f0;font-size:15px;line-height:1.7">${message.replace(/\n/g, '<br>')}</td></tr>
              </table>
              <div style="margin-top:28px;padding:16px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.1);border-radius:10px">
                <a href="mailto:${email}?subject=Re: Your message to Quinn" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,rgba(0,212,255,0.15),rgba(124,58,237,0.15));border:1px solid rgba(0,212,255,0.4);border-radius:8px;color:#00d4ff;text-decoration:none;font-size:13px">\u21A9 Reply to ${name}</a>
              </div>
            </div>
            <div style="padding:20px 32px;background:#050a0e;border-top:1px solid #1f2937">
              <p style="color:#374151;font-size:11px;margin:0">Sent ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET — quinn-portfolio contact form — IP: ${ip}</p>
            </div>
          </div>
        </div>
      </body>
      </html>`;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('\u{1F4EC} [Contact Form - no SMTP configured]', { name, email, message: message.slice(0, 100) });
      return NextResponse.json({ error: 'Email service is not configured yet. Please try again later.' }, { status: 500 });
    }

    await transporter.sendMail({
      from: `"Quinn Portfolio" <${process.env.SMTP_USER}>`,
      to: 'admin@litsune.com',
      replyTo: email,
      subject: `\u2709\uFE0F New message from ${name} — Quinn Portfolio`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: 'Message received! Quinn will get back to you within 24 hours.' });
  } catch (err) {
    console.error('Contact form error:', err);
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Something went wrong: ${detail}` }, { status: 500 });
  }
}
