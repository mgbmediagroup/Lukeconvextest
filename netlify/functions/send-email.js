/*
  IMPORTANT FOR DEPLOYMENT:
  1. Go to your Netlify site → Site settings → Environment variables
  2. Add new variable: RESEND_API_KEY = re_Gype9cus_2J4X6qKfVHjvXChrixtbLxSc
  3. Scope: All (or at least Runtime + Functions)
  4. Save → Trigger deploy
*/

const { Resend } = require('resend');

exports.handler = async (event) => {
  // Security: only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Debug: Log all environment variables (remove this after testing)
  console.log('Environment check:', {
    hasResendKey: !!process.env.RESEND_API_KEY,
    keyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
    keyEnding: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(-4) : 'none'
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing in environment variables!');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' })
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, company, phone, interests, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Interests:</strong> ${interests && interests.length > 0 ? interests.join(', ') : 'None specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['mgbmediagroup@gmail.com'],
      subject: `New contact form submission from ${name}`,
      html: emailContent,
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: data.id })
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};