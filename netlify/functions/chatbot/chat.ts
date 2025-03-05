import type { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { csrfProtection } from '../../../src/lib/csrf';

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://clzvndqgtmbsugmdpdsq.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create the Supabase client only if the key is available
const getSupabaseClient = () => {
    if (!supabaseServiceKey) {
        return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey);
};

// Initialize the OpenAI client
const getOpenAIClient = () => {
    const apiKey = process.env.AZURE_OPENAI_API_KEY || 'FP2sWvoxwsTtctiraEXGC1aZdFNttqdl7a4TCJENGNYzBMTmcHPXJQQJ99AKAC4f1cMXJ3w3AAABACOG1I9R';
    if (!apiKey) {
        return null;
    }

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://mhf-azure-openai-west-gpt4o.openai.azure.com/';
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o';
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2023-05-15';

    return new OpenAI({
        apiKey,
        baseURL: `${endpoint}/openai/deployments/${deploymentName}`,
        defaultQuery: { 'api-version': apiVersion },
    });
};

// Token counting utility (approximate)
const countTokens = (text: string): number => {
    // A very rough approximation: 1 token ~= 4 characters for English text
    return Math.ceil(text.length / 4);
};

// System prompt for the chatbot
const getSystemPrompt = (recruiterInfo?: {
    name?: string;
    company?: string;
    previousInteractions?: boolean;
}): string => {
    let prompt = `
You are an AI assistant for Dean Keesey, a software engineer. Your primary purpose is to help recruiters and hiring managers learn about Dean's professional background and skills while also gathering information about potential job opportunities.

ABOUT DEAN:
- Senior Software Engineer with expertise in TypeScript, React, Node.js, and cloud technologies
- Experienced in building scalable web applications and microservices
- Strong background in frontend development with React, Next.js, and modern UI frameworks
- Proficient in backend development with Node.js, Express, and serverless architectures
- Skilled in cloud platforms including AWS and Azure
- Passionate about clean code, testing, and software architecture
- Values collaborative teams with a focus on delivering high-quality products

YOUR BEHAVIOR:
1. Be professional, helpful, and conversational
2. Answer questions about Dean's experience and skills authentically
3. Strategically gather information about the recruiter, their company, and job opportunities
4. If a resume is requested, collect detailed job information to allow for tailored submission
5. Extract key entities (company names, job titles, skills, etc.) from the conversation
6. Maintain a friendly, professional tone throughout the conversation

INFORMATION COLLECTION GOALS:
- Recruiter details (name, email, company)
- Company information (size, industry, location)
- Job details (title, requirements, team structure)
- Hiring process and timeline
- Business problems they're trying to solve
- Project or product details relevant to the role

IMPORTANT GUIDELINES:
- Never make up information about Dean's background or experience
- Gather information naturally through conversation, not as an interrogation
- If you don't know something about Dean, acknowledge that and offer to pass along the question
- For technical questions, provide honest assessments of Dean's skills based on the information provided
- If a resume is requested, explain that you'll collect some details to ensure the resume is tailored to the opportunity
- Always maintain a professional, helpful demeanor
`;

    // Add personalization if recruiter info is available
    if (recruiterInfo) {
        prompt += '\nCONTEXT FOR THIS CONVERSATION:\n';

        if (recruiterInfo.name) {
            prompt += `- You are speaking with ${recruiterInfo.name}`;
            if (recruiterInfo.company) {
                prompt += ` from ${recruiterInfo.company}`;
            }
            prompt += '\n';
        }

        if (recruiterInfo.previousInteractions) {
            prompt += '- This is a continuation of a previous conversation\n';
        }
    }

    return prompt.trim();
};

// Function to extract entities from a message
const extractEntities = async (
    message: string
): Promise<Array<{ type: string; value: string; confidence: number }>> => {
    try {
        const openaiClient = getOpenAIClient();
        if (!openaiClient) {
            console.warn('OpenAI client not initialized. This is expected during build.');
            return [];
        }

        const response = await openaiClient.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `
You are an entity extraction assistant. Your task is to identify and extract key entities from the text provided.
Focus on the following entity types:
- company: Company names
- job: Job titles or positions
- person: Names of people
- skill: Technical skills or competencies
- location: Geographic locations
- other: Any other significant entity that doesn't fit the above categories

For each entity, provide:
1. The entity type
2. The exact text of the entity
3. A confidence score between 0 and 1 (where 1 is highest confidence)

Format your response as a JSON array of objects with the properties: type, value, and confidence.
Example: [{"type": "company", "value": "Acme Corp", "confidence": 0.95}]
Only respond with the JSON array, nothing else.
`
                },
                { role: 'user', content: message }
            ],
            temperature: 0.3,
            max_tokens: 500,
        });

        const content = response.choices[0]?.message?.content || '[]';

        try {
            return JSON.parse(content);
        } catch (parseError) {
            console.error('Error parsing entity extraction response:', parseError);
            return [];
        }
    } catch (error) {
        console.error('Error extracting entities:', error);
        return [];
    }
};

// Function to detect if a message is requesting a resume
const isResumeRequest = async (
    message: string
): Promise<boolean> => {
    try {
        const openaiClient = getOpenAIClient();
        if (!openaiClient) {
            console.warn('OpenAI client not initialized. This is expected during build.');
            return false;
        }

        const response = await openaiClient.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `
You are an assistant that determines if a message contains a request for a resume, CV, or similar document.
Respond with "true" if the message is asking for a resume, CV, or similar document.
Respond with "false" otherwise.
Only respond with "true" or "false", nothing else.
`
                },
                { role: 'user', content: message }
            ],
            temperature: 0.1,
            max_tokens: 5,
        });

        const content = response.choices[0]?.message?.content?.toLowerCase().trim() || 'false';
        return content === 'true';
    } catch (error) {
        console.error('Error detecting resume request:', error);
        return false;
    }
};

// Handler for the chat function
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

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        // Validate CSRF token for POST requests
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

        // Parse the request body
        const body = JSON.parse(event.body || '{}');
        const { message, conversationId, recruiterId, authToken } = body;

        // Validate required fields
        if (!message || !recruiterId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Get the Supabase client
        const supabase = getSupabaseClient();
        const openai = getOpenAIClient();

        // If the clients are not available, return a mock response during build
        if (!supabase || !openai) {
            console.warn('Clients not initialized. This is expected during build.');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: 'This is a mock response during build.',
                    conversationId: 'mock-id',
                }),
            };
        }

        // Validate the auth token if provided
        if (authToken) {
            const { data: user, error: authError } = await supabase.auth.getUser(authToken);

            if (authError || !user) {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({ error: 'Invalid authentication token' }),
                };
            }
        }

        // Get recruiter information
        const { data: recruiter } = await supabase
            .from('recruiters')
            .select('*')
            .eq('id', recruiterId)
            .single();

        if (!recruiter) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Recruiter not found' }),
            };
        }

        // Update recruiter's last active timestamp
        await supabase
            .from('recruiters')
            .update({ last_active: new Date().toISOString() })
            .eq('id', recruiterId);

        // Create a new conversation if one doesn't exist
        let activeConversationId = conversationId;
        if (!activeConversationId) {
            const { data: newConversation, error: conversationError } = await supabase
                .from('conversations')
                .insert([{
                    recruiter_id: recruiterId,
                    title: 'New Conversation',
                    last_message_at: new Date().toISOString(),
                }])
                .select()
                .single();

            if (conversationError || !newConversation) {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'Failed to create conversation' }),
                };
            }

            activeConversationId = newConversation.id;
        }

        // Get previous messages in the conversation
        const { data: previousMessages } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', activeConversationId)
            .order('created_at', { ascending: true });

        // Prepare the messages for the OpenAI API
        const systemPrompt = getSystemPrompt({
            name: recruiter.name,
            company: recruiter.company_name,
            previousInteractions: Boolean(previousMessages && previousMessages.length > 0),
        });

        const chatMessages = [
            { role: 'system' as const, content: systemPrompt },
            ...(previousMessages || []).map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            { role: 'user' as const, content: message },
        ];

        // Check if this is a resume request
        const resumeRequested = await isResumeRequest(message) || false;

        // Generate the chat completion
        const response = await openai.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 800,
        });

        const assistantMessage = response.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.';
        const tokens = response.usage?.total_tokens || countTokens(assistantMessage);

        // Store the user message
        const { data: userMessageData, error: userMessageError } = await supabase
            .from('messages')
            .insert([{
                conversation_id: activeConversationId,
                content: message,
                role: 'user',
                tokens: countTokens(message),
            }])
            .select()
            .single();

        if (userMessageError) {
            console.error('Error storing user message:', userMessageError);
        }

        // Store the assistant message
        const { data: assistantMessageData, error: assistantMessageError } = await supabase
            .from('messages')
            .insert([{
                conversation_id: activeConversationId,
                content: assistantMessage,
                role: 'assistant',
                tokens,
            }])
            .select()
            .single();

        if (assistantMessageError) {
            console.error('Error storing assistant message:', assistantMessageError);
        }

        // Update the conversation's last_message_at timestamp
        await supabase
            .from('conversations')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', activeConversationId);

        // Extract entities from the user message
        if (userMessageData) {
            const entities = await extractEntities(message);

            if (entities.length > 0) {
                const { error: entitiesError } = await supabase
                    .from('entities')
                    .insert(
                        entities.map(entity => ({
                            conversation_id: activeConversationId,
                            message_id: userMessageData.id,
                            type: entity.type,
                            value: entity.value,
                            confidence: entity.confidence,
                        }))
                    );

                if (entitiesError) {
                    console.error('Error storing entities:', entitiesError);
                }
            }
        }

        // If this is a resume request, update the job description
        if (resumeRequested) {
            // Check if a job description already exists
            const { data: existingJobs } = await supabase
                .from('job_descriptions')
                .select('id')
                .eq('recruiter_id', recruiterId)
                .limit(1);

            if (existingJobs && existingJobs.length > 0) {
                // Update existing job description
                await supabase
                    .from('job_descriptions')
                    .update({ resume_requested: true })
                    .eq('id', existingJobs[0].id);
            } else {
                // Create new job description
                await supabase
                    .from('job_descriptions')
                    .insert([{
                        recruiter_id: recruiterId,
                        title: 'Job Opportunity',
                        resume_requested: true,
                        resume_sent: false,
                    }]);
            }
        }

        // Get updated conversation data with total tokens
        const { data: updatedConversation, error: conversationError } = await supabase
            .from('conversations')
            .select('*')
            .eq('id', activeConversationId)
            .single();

        if (conversationError) {
            console.error('Error fetching updated conversation:', conversationError);
        }

        // Return the response with metadata
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: assistantMessage,
                conversationId: activeConversationId,
                tokens,
                resumeRequested,
                metadata: updatedConversation ? {
                    title: updatedConversation.title,
                    lastMessageAt: updatedConversation.last_message_at,
                    totalTokens: updatedConversation.total_tokens,
                } : undefined,
            }),
        };
    } catch (error) {
        console.error('Error processing chat request:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Error processing chat request',
                message: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
}; 