/**
 * CSRF Protection Utilities
 * 
 * This file contains utilities for implementing CSRF protection in the application.
 * It uses the double submit cookie pattern for CSRF protection.
 */

// Generate a random CSRF token
export const generateCsrfToken = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Set a CSRF token cookie and return the token
export const setCsrfCookie = (): string => {
    const token = generateCsrfToken();

    // Set the CSRF token as a cookie
    document.cookie = `csrf_token=${token}; path=/; SameSite=Strict; secure`;

    return token;
};

// Get the CSRF token from cookies
export const getCsrfTokenFromCookie = (): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrf_token') {
            return value;
        }
    }
    return null;
};

// Add CSRF token to request headers
export const addCsrfToken = (headers: Record<string, string> = {}): Record<string, string> => {
    const token = getCsrfTokenFromCookie();

    if (token) {
        return {
            ...headers,
            'X-CSRF-Token': token,
        };
    }

    // If no token exists, create one
    const newToken = setCsrfCookie();
    return {
        ...headers,
        'X-CSRF-Token': newToken,
    };
};

// Validate CSRF token from request headers against cookie
export const validateCsrfToken = (request: Request): boolean => {
    // Get the token from the request header
    const headerToken = request.headers.get('X-CSRF-Token');

    // Get the token from the cookie
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader || !headerToken) {
        return false;
    }

    // Parse the cookie to get the CSRF token
    const cookies = cookieHeader.split(';');
    let cookieToken = null;

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrf_token') {
            cookieToken = value;
            break;
        }
    }

    // Compare the tokens
    return headerToken === cookieToken;
};

// CSRF protection middleware for Netlify Functions
export const csrfProtection = (event: { headers: Record<string, string> }): { valid: boolean; error?: string } => {
    // Skip CSRF check for GET and OPTIONS requests
    if (event.headers['x-csrf-token'] && event.headers.cookie) {
        // Extract CSRF token from headers
        const headerToken = event.headers['x-csrf-token'];

        // Extract CSRF token from cookies
        const cookies = event.headers.cookie.split(';');
        let cookieToken = null;

        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrf_token') {
                cookieToken = value;
                break;
            }
        }

        // Compare the tokens
        if (headerToken !== cookieToken) {
            return {
                valid: false,
                error: 'CSRF token validation failed',
            };
        }
    } else {
        return {
            valid: false,
            error: 'Missing CSRF token',
        };
    }

    return { valid: true };
}; 