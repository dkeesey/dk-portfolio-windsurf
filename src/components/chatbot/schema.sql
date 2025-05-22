-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create recruiters table
CREATE TABLE IF NOT EXISTS recruiters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  company_size TEXT,
  industry TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  size TEXT,
  industry TEXT,
  location TEXT,
  website TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruiter_id UUID REFERENCES recruiters(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruiter_id UUID REFERENCES recruiters(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  location TEXT,
  salary_range TEXT,
  employment_type TEXT,
  team_structure TEXT,
  reporting_to TEXT,
  hiring_process TEXT,
  timeline TEXT,
  resume_requested BOOLEAN DEFAULT FALSE,
  resume_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create entities table
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('company', 'job', 'person', 'skill', 'location', 'other')),
  value TEXT NOT NULL,
  confidence FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversations_recruiter_id ON conversations(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_recruiters_user_id ON recruiters(user_id);
CREATE INDEX IF NOT EXISTS idx_recruiters_email ON recruiters(email);
CREATE INDEX IF NOT EXISTS idx_job_descriptions_recruiter_id ON job_descriptions(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_entities_conversation_id ON entities(conversation_id);
CREATE INDEX IF NOT EXISTS idx_entities_message_id ON entities(message_id);
CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at timestamp
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON conversations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_descriptions_updated_at
BEFORE UPDATE ON job_descriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies for recruiters
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recruiter profile"
  ON recruiters
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own recruiter profile"
  ON recruiters
  FOR UPDATE
  USING (user_id = auth.uid());

-- Create RLS policies for conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view their own conversations"
  ON conversations
  FOR SELECT
  USING (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

CREATE POLICY "Recruiters can insert their own conversations"
  ON conversations
  FOR INSERT
  WITH CHECK (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

CREATE POLICY "Recruiters can update their own conversations"
  ON conversations
  FOR UPDATE
  USING (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

-- Create RLS policies for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view messages in their conversations"
  ON messages
  FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM conversations WHERE recruiter_id IN (
      SELECT id FROM recruiters WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Recruiters can insert messages in their conversations"
  ON messages
  FOR INSERT
  WITH CHECK (conversation_id IN (
    SELECT id FROM conversations WHERE recruiter_id IN (
      SELECT id FROM recruiters WHERE user_id = auth.uid()
    )
  ));

-- Create RLS policies for job descriptions
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view their own job descriptions"
  ON job_descriptions
  FOR SELECT
  USING (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

CREATE POLICY "Recruiters can insert their own job descriptions"
  ON job_descriptions
  FOR INSERT
  WITH CHECK (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

CREATE POLICY "Recruiters can update their own job descriptions"
  ON job_descriptions
  FOR UPDATE
  USING (recruiter_id IN (
    SELECT id FROM recruiters WHERE user_id = auth.uid()
  ));

-- Create RLS policies for entities
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view entities from their conversations"
  ON entities
  FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM conversations WHERE recruiter_id IN (
      SELECT id FROM recruiters WHERE user_id = auth.uid()
    )
  ));

-- Create function to get conversation history
CREATE OR REPLACE FUNCTION get_conversation_history(conversation_uuid UUID)
RETURNS TABLE (
  id UUID,
  role TEXT,
  content TEXT,
  tokens INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT m.id, m.role, m.content, m.tokens, m.created_at
  FROM messages m
  WHERE m.conversation_id = conversation_uuid
  ORDER BY m.created_at ASC;
END;
$$ LANGUAGE plpgsql; 