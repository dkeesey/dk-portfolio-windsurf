import type { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { csrfProtection } from '../../../src/lib/csrf';

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create the Supabase client only if the key is available
const getSupabaseClient = () => {
    if (!supabaseServiceKey) {
        console.warn('Supabase Service Role Key is missing. Database operations will not work.');
        return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey);
};

// Create a single instance of the Supabase client
const supabase = getSupabaseClient();

// Default page size for message pagination
const DEFAULT_PAGE_SIZE = 20;

// Handler for the chat history function
export const handler: Handler = async (event: HandlerEvent) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
            ? 'https://deankeesey.com'
            : '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        'Vary': 'Origin', // Add Vary header for proper caching behavior
        'Access-Control-Max-Age': '86400', // Cache preflight results for 24 hours
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: '',
        };
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        // Skip CSRF validation for development environment
        if (process.env.NODE_ENV === 'production') {
            // Convert headers to Record<string, string> to satisfy the type requirement
            const headersRecord: Record<string, string> = {};
            for (const [key, value] of Object.entries(event.headers)) {
                if (value !== undefined) {
                    headersRecord[key] = value;
                }
            }

            const csrfResult = csrfProtection({ headers: headersRecord });
            if (!csrfResult.valid) {
                return {
                    statusCode: 403,
                    headers,
                    body: JSON.stringify({ error: csrfResult.error || 'CSRF validation failed' }),
                };
            }
        }

        // Check if Supabase client is available
        if (!supabase) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Database connection not available' }),
            };
        }

        // Get parameters from the query string
        const recruiterId = event.queryStringParameters?.recruiterId;
        const conversationId = event.queryStringParameters?.conversationId;
        const beforeMessageId = event.queryStringParameters?.before;
        const pageSize = parseInt(event.queryStringParameters?.pageSize || DEFAULT_PAGE_SIZE.toString(), 10);

        if (!recruiterId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Recruiter ID is required' }),
            };
        }

        // If conversationId is provided, use it; otherwise, get the most recent conversation
        let conversation;

        if (conversationId) {
            // Verify the conversation belongs to the recruiter
            const { data: conversationData, error: conversationError } = await supabase
                .from('conversations')
                .select('*')
                .eq('id', conversationId)
                .eq('recruiter_id', recruiterId)
                .single();

            if (conversationError) {
                console.error('Error fetching conversation:', conversationError);
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Conversation not found or access denied' }),
                };
            }

            conversation = conversationData;
        } else {
            // Get the most recent conversation for this recruiter
            const { data: conversations, error: conversationsError } = await supabase
                .from('conversations')
                .select('*')
                .eq('recruiter_id', recruiterId)
                .order('last_message_at', { ascending: false })
                .limit(1);

            if (conversationsError) {
                console.error('Error fetching conversations:', conversationsError);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'Error fetching conversations' }),
                };
            }

            if (!conversations || conversations.length === 0) {
                // No conversations found, return empty result
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ conversationId: null, messages: [] }),
                };
            }

            conversation = conversations[0];
        }

        // Build the query for messages
        let messagesQuery = supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversation.id);

        // If beforeMessageId is provided, get messages created before that message
        if (beforeMessageId) {
            // First, get the timestamp of the reference message
            const { data: referenceMessage, error: referenceError } = await supabase
                .from('messages')
                .select('created_at')
                .eq('id', beforeMessageId)
                .eq('conversation_id', conversation.id)
                .single();

            if (referenceError) {
                console.error('Error fetching reference message:', referenceError);
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Invalid reference message ID' }),
                };
            }

            // Then get messages created before that timestamp
            messagesQuery = messagesQuery
                .lt('created_at', referenceMessage.created_at)
                .order('created_at', { ascending: false })
                .limit(pageSize);
        } else {
            // Get the most recent messages
            messagesQuery = messagesQuery
                .order('created_at', { ascending: true })
                .limit(pageSize + 1); // Get one extra to check if there are more
        }

        // Execute the query
        const { data: messages, error: messagesError } = await messagesQuery;

        if (messagesError) {
            console.error('Error fetching messages:', messagesError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Error fetching messages' }),
            };
        }

        // Check if there are more messages to load
        let hasMoreMessages = false;
        let resultMessages = messages || [];

        if (!beforeMessageId && resultMessages.length > pageSize) {
            // Remove the extra message we fetched to check if there are more
            resultMessages = resultMessages.slice(0, pageSize);
            hasMoreMessages = true;
        } else if (beforeMessageId) {
            // For pagination, we need to check if there are more messages before these
            const { count, error: countError } = await supabase
                .from('messages')
                .select('id', { count: 'exact', head: true })
                .eq('conversation_id', conversation.id)
                .lt('created_at', resultMessages[resultMessages.length - 1]?.created_at || '');

            if (!countError && count && count > 0) {
                hasMoreMessages = true;
            }

            // Reverse the order back to ascending for the client
            resultMessages = resultMessages.reverse();
        }

        // Get the total message count for the conversation
        const { count: totalMessages, error: countError } = await supabase
            .from('messages')
            .select('id', { count: 'exact', head: true })
            .eq('conversation_id', conversation.id);

        if (countError) {
            console.error('Error counting messages:', countError);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                conversationId: conversation.id,
                conversation: {
                    ...conversation,
                    total_messages: totalMessages || resultMessages.length
                },
                messages: resultMessages,
                hasMoreMessages,
            }),
        };
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Error processing request',
                message: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
}; 