import OpenAI from 'openai';

// Initialize the Azure OpenAI client with environment variables
const endpoint = import.meta.env.AZURE_OPENAI_ENDPOINT || '';
const apiKey = import.meta.env.AZURE_OPENAI_API_KEY || '';
const deploymentName = import.meta.env.AZURE_OPENAI_DEPLOYMENT_NAME || '';
const apiVersion = import.meta.env.AZURE_OPENAI_API_VERSION || '2023-05-15';

// Create a single instance of the OpenAI client to be used throughout the app
export const openaiClient = new OpenAI({
    apiKey,
    baseURL: `${endpoint}/openai/deployments/${deploymentName}`,
    defaultQuery: { 'api-version': apiVersion },
});

// Token counting utility (approximate)
export const countTokens = (text: string): number => {
    // A very rough approximation: 1 token ~= 4 characters for English text
    return Math.ceil(text.length / 4);
};

// System prompt for the chatbot
export const getSystemPrompt = (recruiterInfo?: {
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

// Function to generate a chat completion
export const generateChatCompletion = async (
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: {
        temperature?: number;
        maxTokens?: number;
    }
): Promise<{ content: string; tokens: number }> => {
    try {
        const response = await openaiClient.chat.completions.create({
            model: deploymentName,
            messages,
            temperature: options?.temperature || 0.7,
            max_tokens: options?.maxTokens || 800,
        });

        const content = response.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.';
        const tokens = response.usage?.total_tokens || countTokens(content);

        return { content, tokens };
    } catch (error) {
        console.error('Error generating chat completion:', error);
        return {
            content: 'I apologize, but I encountered an error while processing your request. Please try again later.',
            tokens: 0
        };
    }
};

// Function to extract entities from a message
export const extractEntities = async (
    message: string
): Promise<Array<{ type: string; value: string; confidence: number }>> => {
    try {
        const response = await openaiClient.chat.completions.create({
            model: deploymentName,
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
export const isResumeRequest = async (
    message: string
): Promise<boolean> => {
    try {
        const response = await openaiClient.chat.completions.create({
            model: deploymentName,
            messages: [
                {
                    role: 'system',
                    content: `
You are an assistant that determines if a message contains a request for a resume or CV.
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