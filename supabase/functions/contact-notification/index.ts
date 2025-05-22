// Follow this setup guide to integrate the Deno runtime into your project:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// SMTP configuration
// Note: You'll need to set these as secrets in Supabase
// supabase secrets set SMTP_HOST=your-smtp-host SMTP_USERNAME=your-username SMTP_PASSWORD=your-password
const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com';
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || 'your-email@gmail.com';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'contact@deankeesey.com';

// This function can be triggered in three ways:
// 1. Invoke the function directly using the Supabase Edge Functions URL
// 2. Set up a Database webhook to trigger on new contact_submissions insertions
// 3. Set up a CRON schedule to check for new submissions
serve(async (req) => {
  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      // Supabase API URL - env var exposed by default when deployed
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exposed by default when deployed
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the function
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Handle different request methods
    if (req.method === 'POST') {
      // Handle direct invocation with payload
      const { record } = await req.json();
      if (record) {
        await sendContactEmail(record);
        return new Response(
          JSON.stringify({ message: 'Email notification sent successfully' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else if (req.method === 'GET') {
      // Handle scheduled invocation - check for new submissions
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      
      const { data: newSubmissions, error } = await supabaseClient
        .from('contact_submissions')
        .select('*')
        .eq('status', 'new')
        .gte('created_at', fiveMinutesAgo.toISOString());
      
      if (error) {
        throw error;
      }
      
      if (newSubmissions && newSubmissions.length > 0) {
        for (const submission of newSubmissions) {
          await sendContactEmail(submission);
          
          // Update status to 'notified'
          await supabaseClient
            .from('contact_submissions')
            .update({ status: 'notified' })
            .eq('id', submission.id);
        }
        
        return new Response(
          JSON.stringify({ 
            message: `Processed ${newSubmissions.length} new contact submissions` 
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ message: 'No new submissions found' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Default response
    return new Response(
      JSON.stringify({ 
        message: 'Contact notification function is running. Use POST to send notifications or GET to check for new submissions.' 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function sendContactEmail(submission) {
  try {
    // Create SMTP client
    const client = new SmtpClient();
    
    // Connect to SMTP server
    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    });
    
    // Format date for display
    const formattedDate = new Date(submission.created_at).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Construct email content
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p>You've received a new contact form submission on <strong>${formattedDate}</strong>.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
            <p><strong>Subject:</strong> ${submission.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-line; padding: 15px; background: #fff; border-radius: 5px; border-left: 4px solid #007bff;">
              ${submission.message}
            </div>
          </div>

          <p>You can reply directly to this email to respond to ${submission.name}.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #777; font-size: 12px;">
            This is an automated notification from your website contact form.
            Submission ID: ${submission.id}
          </p>
        </body>
      </html>
    `;
    
    // Send email
    await client.send({
      from: SMTP_USERNAME,
      to: NOTIFICATION_EMAIL,
      subject: `New Contact: ${submission.subject}`,
      content: emailContent,
      html: emailContent,
    });
    
    // Close connection
    await client.close();
    
    console.log('Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
}
