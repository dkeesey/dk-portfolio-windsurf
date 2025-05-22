import type { APIRoute } from 'astro';
import { addCsrfToken } from '@/lib/csrf';

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const recruiterId = url.searchParams.get('recruiterId');

        if (!recruiterId) {
            return new Response(
                JSON.stringify({
                    error: 'Missing required recruiterId parameter',
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Get all query parameters to forward them
        const queryParams = new URLSearchParams();
        for (const [key, value] of url.searchParams.entries()) {
            queryParams.append(key, value);
        }

        // Add CSRF token to headers
        const headers = addCsrfToken({
            'Content-Type': 'application/json',
        });

        // Forward the request to the Netlify function with all query parameters
        const response = await fetch(`/.netlify/functions/chatbot/history?${queryParams.toString()}`, {
            method: 'GET',
            headers,
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in history API proxy:', error);

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