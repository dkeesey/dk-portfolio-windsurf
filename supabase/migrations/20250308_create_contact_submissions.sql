-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  notes TEXT,
  ip_address TEXT,
  user_agent TEXT
);

-- Set up Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to insert new submissions
CREATE POLICY "Allow anonymous submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Only allow authenticated users to view submissions
CREATE POLICY "Allow authenticated users to view submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create a function to notify on new submissions
CREATE OR REPLACE FUNCTION public.handle_new_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger will be used by the Edge Function to send emails
  -- We're just creating the function framework here
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call this function on new submissions
CREATE TRIGGER on_new_contact_submission
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_contact_submission();

-- Add comment to describe the table
COMMENT ON TABLE public.contact_submissions IS 'Stores contact form submissions from the website';
