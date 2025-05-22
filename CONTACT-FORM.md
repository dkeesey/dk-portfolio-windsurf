# Contact Form Integration

This document explains how the contact form works in the dk-portfolio-windsurf project.

## Overview

The contact form has been implemented with a hybrid approach:

1. **Primary storage**: Supabase database
2. **Email notifications**: Supabase Edge Function
3. **Backup storage**: Netlify Forms (in production only)

This setup provides several advantages:
- Works in both local development and production
- Stores submissions in a database for easy access
- Sends email notifications for new submissions
- Has redundancy via Netlify Forms (in production)

## How It Works

### Form Submission Flow

1. User fills out and submits the contact form
2. Data is validated using Zod on the client-side
3. On successful validation:
   - Data is saved to Supabase `contact_submissions` table
   - In production, data is also submitted to Netlify Forms as a backup
4. A success message is shown to the user

### Email Notification Flow

1. When a new submission is added to the `contact_submissions` table:
   - It triggers a database function `handle_new_contact_submission()`
   - This can be connected to a webhook that calls the Edge Function

2. The Edge Function `contact-notification`:
   - Formats the submission into a nicely formatted email
   - Sends the notification to your specified email address
   - Updates the submission status from 'new' to 'notified'

3. The Edge Function can be triggered in three ways:
   - Directly via webhook when a new submission is received
   - On a schedule (every few minutes) to check for new submissions
   - Manually by calling the function endpoint

## Components

### 1. Database Table

The `contact_submissions` table stores all form submissions with the following fields:
- `id`: Unique identifier (UUID)
- `created_at`: Timestamp of submission
- `name`: Submitter's name
- `email`: Submitter's email
- `subject`: Message subject
- `message`: Full message content
- `status`: Current status ('new', 'notified', 'replied', 'closed')
- `notes`: Optional admin notes
- `ip_address`: Optional IP address of submitter
- `user_agent`: Browser/device information

### 2. Form Component

Located at `src/components/forms/ContactForm.tsx`:
- Uses React Hook Form with Zod validation
- Handles form submission to Supabase
- Falls back to Netlify Forms in production
- Shows success/error messages using toast notifications

### 3. Edge Function

Located at `supabase/functions/contact-notification/index.ts`:
- Sends email notifications for new submissions
- Updates submission status
- Can be triggered manually, via webhook, or on a schedule

### 4. Admin Interface

Located at `src/pages/admin/contact.astro` and `src/components/admin/ContactSubmissionsAdmin.tsx`:
- View all contact form submissions
- Filter and search submissions
- View submission details
- Update submission status
- Reply via email

## Configuration

### SMTP Settings

The Edge Function uses SMTP to send emails. You'll need to configure the following environment variables:

```bash
# Local development
supabase secrets set SMTP_HOST=your-smtp-host SMTP_PORT=587 SMTP_USERNAME=your-email@gmail.com SMTP_PASSWORD=your-password NOTIFICATION_EMAIL=contact@deankeesey.com

# Production
supabase secrets set --project-ref clzvndqgtmbsugmdpdsq SMTP_HOST=your-smtp-host SMTP_PORT=587 SMTP_USERNAME=your-email@gmail.com SMTP_PASSWORD=your-password NOTIFICATION_EMAIL=contact@deankeesey.com
```

For Gmail, you might need to create an App Password instead of using your regular password.

## Local Development

To test the contact form locally:

1. Start your development server: `npm run dev`
2. Fill out and submit the form
3. The submission will be saved to your Supabase database
4. Check `contact_submissions` table in Supabase dashboard or admin page

To test email notifications locally:

1. Set up the required SMTP environment variables
2. Start the Edge Function: `supabase functions serve contact-notification`
3. Manually trigger the function: `curl -X GET http://localhost:54321/functions/v1/contact-notification`

## Deployment

1. **Database**: Deploy the migration to create the `contact_submissions` table:
   ```
   supabase db push
   ```

2. **Edge Function**: Deploy the notification function:
   ```
   supabase functions deploy contact-notification
   ```

3. **Set secrets** for the Edge Function:
   ```
   supabase secrets set --project-ref clzvndqgtmbsugmdpdsq SMTP_HOST=your-smtp-host SMTP_PORT=587 SMTP_USERNAME=your-email@gmail.com SMTP_PASSWORD=your-password NOTIFICATION_EMAIL=contact@deankeesey.com
   ```

## Troubleshooting

### Form Submissions Not Saving
- Check browser console for errors
- Verify Supabase connection in the client
- Check RLS policies on the `contact_submissions` table

### Email Notifications Not Working
- Verify SMTP settings are correctly set
- Check Edge Function logs for errors: `supabase functions logs contact-notification`
- Test the Edge Function manually to diagnose issues

### Admin Page Not Showing Submissions
- Verify you're logged in to Supabase (authentication required)
- Check RLS policy allows authenticated users to view submissions
- Check browser console for any errors
