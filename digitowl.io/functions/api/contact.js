// Cloudflare Pages Function to handle contact form submissions via Mailgun
// Environment variables needed: MAILGUN_API_KEY, MAILGUN_DOMAIN

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://digitowl.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'All fields are required'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email address'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Send email via Mailgun
    const mailgunDomain = env.MAILGUN_DOMAIN || 'mail.digitowl.io';
    const mailgunEndpoint = `https://api.mailgun.net/v3/${mailgunDomain}/messages`;

    const emailData = new FormData();
    emailData.append('from', `DigitOwl Contact Form <contact@${mailgunDomain}>`);
    emailData.append('to', 'contact@digitowl.io');
    emailData.append('reply-to', email);
    emailData.append('subject', `[Contact Form] ${subject}`);
    emailData.append('text', `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from DigitOwl.io contact form
    `.trim());
    emailData.append('html', `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #475569; }
    .value { margin-top: 4px; color: #1e293b; }
    .message { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; }
    .footer { text-align: center; padding: 16px; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${escapeHtml(subject)}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message">${escapeHtml(message)}</div>
      </div>
    </div>
    <div class="footer">
      Sent from DigitOwl.io contact form
    </div>
  </div>
</body>
</html>
    `.trim());

    const response = await fetch(mailgunEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${env.MAILGUN_API_KEY}`)}`
      },
      body: emailData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailgun error:', errorText);
      throw new Error('Failed to send email');
    }

    // Return success - redirect back to the page with success message
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/?contact=success#contact',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/?contact=error#contact',
        ...corsHeaders
      }
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://digitowl.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

// Helper to escape HTML
function escapeHtml(text) {
  const div = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, s => div[s]);
}
