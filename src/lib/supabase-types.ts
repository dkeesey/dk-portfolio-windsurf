// Defines types for Supabase database tables

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'notified' | 'replied' | 'closed';
  notes?: string;
  ip_address?: string;
  user_agent?: string;
};

// Add existing types if you have them
// export type Recruiter = { ... };
// export type Conversation = { ... };
// etc.
