import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables. Please check your .env file.');
    process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
    try {
        console.log('Setting up database schema...');

        // Read SQL file
        const sqlFilePath = path.join(__dirname, 'schema.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        // Split SQL into statements
        const statements = sql
            .split(';')
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        // Execute each statement
        for (const statement of statements) {
            const { error } = await supabase.rpc('exec_sql', { sql: statement });

            if (error) {
                console.error(`Error executing SQL: ${error.message}`);
                console.error('Statement:', statement);
            }
        }

        console.log('Database schema setup complete!');
    } catch (error) {
        console.error('Error setting up database schema:', error);
    }
}

async function setupInitialSystemPrompt() {
    try {
        console.log('Setting up initial system prompt...');

        // Create a system conversation
        const { data: conversation, error: conversationError } = await supabase
            .from('conversations')
            .insert({
                recruiter_id: null, // System conversation has no recruiter
            })
            .select()
            .single();

        if (conversationError) {
            throw conversationError;
        }

        // Add system prompt
        const systemPrompt = `You are a helpful assistant for a portfolio website. Your purpose is to help recruiters learn more about the website owner's skills, experience, and projects. Be professional, concise, and helpful. If asked about personal contact information, direct recruiters to use the contact form on the website instead of providing direct contact details.`;

        const { error: messageError } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversation.id,
                role: 'system',
                content: systemPrompt,
            });

        if (messageError) {
            throw messageError;
        }

        console.log('Initial system prompt setup complete!');
    } catch (error) {
        console.error('Error setting up initial system prompt:', error);
    }
}

async function main() {
    try {
        await setupDatabase();
        await setupInitialSystemPrompt();
        console.log('Chatbot setup complete!');
    } catch (error) {
        console.error('Error during setup:', error);
    }
}

main(); 