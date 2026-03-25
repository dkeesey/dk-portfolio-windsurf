/**
 * Cloudflare Pages Function - Contact notification
 * Called after Supabase stores the submission; sends email via Resend.
 * Env vars: RESEND_API_KEY, EMAIL_TO (default: dkeesey@gmail.com)
 */

export async function onRequestPost(context) {
  try {
    const { name, email, subject, message } = await context.request.json();

    if (!name || !email || !subject || !message) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const { RESEND_API_KEY, EMAIL_TO } = context.env;
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured');
      return json({ success: true, note: 'stored, email skipped' });
    }

    const body = `New contact form submission from deankeesey.com

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply directly to ${email} to respond.`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dean Keesey Contact Form <contact@deankeesey.com>',
        to: [EMAIL_TO || 'dkeesey@gmail.com'],
        reply_to: email,
        subject: `[Contact] ${subject} — ${name}`,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend error:', err);
    }

    return json({ success: true });
  } catch (error) {
    console.error('Contact notification error:', error);
    return json({ error: 'Internal server error' }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
