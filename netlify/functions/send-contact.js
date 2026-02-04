import { Resend } from 'resend';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse request body
    const body = await req.json();
    const { fullName, email, company, phone, interests, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: fullName, email, and message are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email service not configured' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Resend
    const resend = new Resend(apiKey);

    // Split full name into first and last
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Format timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Format interests
    const interestsList = interests && interests.length > 0 
      ? interests.join(', ') 
      : 'None specified';

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
            .message-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #333;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0; color: #666;">Received on ${timestamp}</p>
            </div>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${fullName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${company || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Interests:</div>
              <div class="value">${interestsList}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
              <p>This message was sent from the MGB Media Group contact form on your website.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send main email to MGB Media Group
    const { data: mainEmailData, error: mainEmailError } = await resend.emails.send({
      from: 'MGB Media Group Contact Form <onboarding@resend.dev>',
      to: ['mgbmediagroup@gmail.com'],
      subject: `New contact form submission from ${fullName}`,
      html: htmlContent,
    });

    if (mainEmailError) {
      console.error('Failed to send main email:', mainEmailError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to send email. Please try again.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send auto-reply to the submitter
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .content { margin-bottom: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #333;">Thank you for contacting MGB Media Group!</h2>
            </div>
            
            <div class="content">
              <p>Hi ${firstName},</p>
              
              <p>Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
              
              <p>Here's a summary of what you sent:</p>
              <ul>
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Interests:</strong> ${interestsList}</li>
              </ul>
              
              <p>We're excited to learn more about your project and discuss how we can help bring your vision to life.</p>
              
              <p>Best regards,<br>
              The MGB Media Group Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>If you need immediate assistance, please contact us directly at mgbmediagroup@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send auto-reply (don't fail the main request if this fails)
    try {
      await resend.emails.send({
        from: 'MGB Media Group <onboarding@resend.dev>',
        to: [email],
        subject: 'Thank you for contacting MGB Media Group',
        html: autoReplyHtml,
      });
    } catch (autoReplyError) {
      console.warn('Failed to send auto-reply:', autoReplyError);
      // Don't fail the main request for auto-reply issues
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      emailId: mainEmailData?.id
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Function error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid request format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle other errors
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};