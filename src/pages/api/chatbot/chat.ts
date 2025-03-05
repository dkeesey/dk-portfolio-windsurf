import type { APIRoute } from 'astro';
import { addCsrfToken } from '@/lib/csrf';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Add CSRF token to headers
        const headers = addCsrfToken({
            'Content-Type': 'application/json',
        });

        // Forward the request to the Netlify function
        const response = await fetch('/.netlify/functions/chatbot/chat', {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in chat API proxy:', error);

        return new Response(
            JSON.stringify({
                error: 'Error processing request',
                message: error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}; 