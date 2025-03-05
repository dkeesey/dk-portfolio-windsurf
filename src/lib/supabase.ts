import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables or fallback to the provided URL
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';

// Create a function to get the Supabase client
const getSupabaseClient = () => {
    if (!supabaseAnonKey) {
        if (typeof window !== 'undefined') {
            console.warn('Supabase Anon Key is missing. Authentication will not work.');
        }
        return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
};

// Create a single instance of the Supabase client to be used throughout the app
// During build time, we'll use a placeholder client that won't make actual API calls
export const supabase = getSupabaseClient() || createClient(supabaseUrl, 'placeholder-key-for-build-time');

// Types for our database schema
export type Recruiter = {
    id: string;
    created_at: string;
    email: string;
    name: string;
    phone?: string;
    company_name?: string;
    company_size?: string;
    industry?: string;
    location?: string;
    last_active: string;
};

export type Company = {
    id: string;
    created_at: string;
    name: string;
    size?: string;
    industry?: string;
    location?: string;
    website?: string;
    description?: string;
};

export type Conversation = {
    id: string;
    created_at: string;
    recruiter_id: string;
    title?: string;
    last_message_at: string;
};

export type Message = {
    id: string;
    created_at: string;
    conversation_id: string;
    content: string;
    role: 'user' | 'assistant';
    tokens?: number;
};

export type JobDescription = {
    id: string;
    created_at: string;
    recruiter_id: string;
    company_id?: string;
    title: string;
    description?: string;
    requirements?: string;
    location?: string;
    salary_range?: string;
    employment_type?: string;
    team_structure?: string;
    reporting_to?: string;
    hiring_process?: string;
    timeline?: string;
    resume_requested: boolean;
    resume_sent: boolean;
};

export type Entity = {
    id: string;
    created_at: string;
    conversation_id: string;
    message_id: string;
    type: 'company' | 'job' | 'person' | 'skill' | 'location' | 'other';
    value: string;
    confidence: number;
};

// Helper functions for working with the database
export const getRecruiterByEmail = async (email: string): Promise<Recruiter | null> => {
    const { data, error } = await supabase
        .from('recruiters')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching recruiter:', error);
        return null;
    }

    return data;
};

export const createRecruiter = async (recruiter: Omit<Recruiter, 'id' | 'created_at' | 'last_active'>): Promise<Recruiter | null> => {
    const { data, error } = await supabase
        .from('recruiters')
        .insert([{ ...recruiter, last_active: new Date().toISOString() }])
        .select()
        .single();

    if (error) {
        console.error('Error creating recruiter:', error);
        return null;
    }

    return data;
};

export const updateRecruiterActivity = async (recruiterId: string): Promise<void> => {
    const { error } = await supabase
        .from('recruiters')
        .update({ last_active: new Date().toISOString() })
        .eq('id', recruiterId);

    if (error) {
        console.error('Error updating recruiter activity:', error);
    }
};

export const getConversationsByRecruiterId = async (recruiterId: string): Promise<Conversation[]> => {
    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('recruiter_id', recruiterId)
        .order('last_message_at', { ascending: false });

    if (error) {
        console.error('Error fetching conversations:', error);
        return [];
    }

    return data || [];
};

export const getMessagesByConversationId = async (conversationId: string): Promise<Message[]> => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }

    return data || [];
};

export const createConversation = async (recruiterId: string, title?: string): Promise<Conversation | null> => {
    const { data, error } = await supabase
        .from('conversations')
        .insert([{
            recruiter_id: recruiterId,
            title: title || 'New Conversation',
            last_message_at: new Date().toISOString()
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating conversation:', error);
        return null;
    }

    return data;
};

export const addMessage = async (message: Omit<Message, 'id' | 'created_at'>): Promise<Message | null> => {
    const { data, error } = await supabase
        .from('messages')
        .insert([message])
        .select()
        .single();

    if (error) {
        console.error('Error adding message:', error);
        return null;
    }

    // Update the conversation's last_message_at timestamp
    await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', message.conversation_id);

    return data;
};

export const extractAndStoreEntities = async (
    conversationId: string,
    messageId: string,
    entities: Array<{ type: Entity['type']; value: string; confidence: number }>
): Promise<void> => {
    if (entities.length === 0) return;

    const { error } = await supabase
        .from('entities')
        .insert(
            entities.map(entity => ({
                conversation_id: conversationId,
                message_id: messageId,
                type: entity.type,
                value: entity.value,
                confidence: entity.confidence
            }))
        );

    if (error) {
        console.error('Error storing entities:', error);
    }
};

export const createOrUpdateJobDescription = async (
    jobDescription: Omit<JobDescription, 'id' | 'created_at'>
): Promise<JobDescription | null> => {
    // Check if a job description already exists for this recruiter
    const { data: existingJobs } = await supabase
        .from('job_descriptions')
        .select('id')
        .eq('recruiter_id', jobDescription.recruiter_id)
        .limit(1);

    let result;

    if (existingJobs && existingJobs.length > 0) {
        // Update existing job description
        const { data, error } = await supabase
            .from('job_descriptions')
            .update(jobDescription)
            .eq('id', existingJobs[0].id)
            .select()
            .single();

        if (error) {
            console.error('Error updating job description:', error);
            return null;
        }

        result = data;
    } else {
        // Create new job description
        const { data, error } = await supabase
            .from('job_descriptions')
            .insert([jobDescription])
            .select()
            .single();

        if (error) {
            console.error('Error creating job description:', error);
            return null;
        }

        result = data;
    }

    return result;
};

export const getJobDescriptionByRecruiterId = async (recruiterId: string): Promise<JobDescription | null> => {
    const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('recruiter_id', recruiterId)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
            console.error('Error fetching job description:', error);
        }
        return null;
    }

    return data;
}; 