# Security Approach for Chatbot Implementation

This document outlines the security approach for the recruiter-focused chatbot implementation, focusing on Content Security Policy (CSP), Cross-Origin Resource Sharing (CORS), authentication, and data protection.

## Content Security Policy (CSP)

### Current Configuration

The project implements a development-friendly CSP in `astro.config.mjs` that allows for the necessary connections while maintaining security:

```javascript
'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://*.posthog.com https://app.posthog.com https://*.googletagmanager.com https://www.google-analytics.com https://*.supabase.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://placehold.co https://*.posthog.com https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://*.posthog.com https://app.posthog.com https://*.google-analytics.com https://www.googletagmanager.com https://*.openai.azure.com https://*.supabase.co https://api.github.com https://api.linkedin.com;"
```

### Key Directives

1. **default-src 'self'**: Restricts all fetches to the same origin by default
2. **script-src**: Allows scripts from:
   - Same origin ('self')
   - PostHog analytics (https://*.posthog.com, https://app.posthog.com)
   - Google Analytics (https://*.googletagmanager.com, https://www.google-analytics.com)
   - Supabase (https://*.supabase.co)
   - Necessary inline scripts ('unsafe-inline', 'unsafe-eval', 'wasm-unsafe-eval', 'inline-speculation-rules')
3. **connect-src**: Allows connections to:
   - Same origin ('self')
   - PostHog analytics
   - Google Analytics
   - Azure OpenAI (https://*.openai.azure.com)
   - Supabase (https://*.supabase.co)
   - GitHub API (for authentication)
   - LinkedIn API (for authentication)

### Production Recommendations

For production, we recommend tightening the CSP by:

1. Removing 'unsafe-inline' and 'unsafe-eval' where possible
2. Using nonces or hashes for inline scripts that are necessary
3. Specifying exact domains rather than wildcards where feasible
4. Implementing a report-uri directive to monitor CSP violations

## Cross-Origin Resource Sharing (CORS)

### Implementation in Netlify Functions

Both `chat.ts` and `history.ts` Netlify Functions implement CORS headers:

```javascript
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
};
```

### Preflight Handling

The functions properly handle preflight requests:

```javascript
if (event.httpMethod === 'OPTIONS') {
    return {
        statusCode: 204,
        headers,
        body: '',
    };
}
```

### Production Recommendations

For production, we recommend:

1. Restricting 'Access-Control-Allow-Origin' to specific domains rather than '*'
2. Implementing 'Access-Control-Max-Age' to cache preflight results
3. Adding 'Vary: Origin' header to ensure proper caching behavior

## Authentication Security

### Current Implementation

The chatbot uses Supabase for authentication, which provides:

1. JWT-based authentication
2. Social login capabilities (GitHub, LinkedIn)
3. Row-Level Security (RLS) policies

### Planned Enhancements

1. Implement HttpOnly cookies for token storage
2. Add CSRF protection
3. Set up proper session management (timeout, refresh, revocation)
4. Implement rate limiting

## Data Protection

### Database Security

1. Row-Level Security (RLS) policies are implemented in Supabase
2. Service role key is used only in secure server-side contexts
3. Anonymous key is used for client-side operations with limited permissions

### Sensitive Information Handling

1. Environment variables are used for API keys and endpoints
2. Fallback values are provided for build time but not exposed to clients
3. Error messages are sanitized to prevent information leakage

## Error Handling

### Current Implementation

Basic error handling is implemented in the Netlify Functions:

```javascript
try {
    // Function logic
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
```

### Planned Enhancements

1. Implement more granular error codes
2. Add structured logging for better error tracking
3. Create user-friendly error messages while hiding implementation details
4. Set up monitoring for repeated errors or potential attack patterns

## Testing Strategy

### Planned Testing Approach

1. **CSP Validation**:
   - Use CSP Evaluator tool
   - Implement automated tests to verify CSP headers
   - Test with different browsers to ensure compatibility

2. **Authentication Testing**:
   - Test social login flows
   - Verify token handling and session management
   - Test against common authentication vulnerabilities

3. **CORS Testing**:
   - Verify preflight handling
   - Test cross-origin requests from allowed and disallowed origins
   - Check header presence and values

4. **Penetration Testing**:
   - Conduct regular security scans
   - Test for common vulnerabilities (XSS, CSRF, injection)
   - Verify data access controls

## Compliance Considerations

1. **GDPR Compliance**:
   - Implement proper data retention policies
   - Add user consent mechanisms for data collection
   - Provide data export functionality

2. **Security Best Practices**:
   - Keep dependencies updated
   - Follow OWASP security guidelines
   - Implement regular security reviews

## Conclusion

This security approach aims to balance functionality with strong security practices. By implementing proper CSP, CORS, authentication, and data protection measures, we can ensure that the chatbot operates securely while providing a seamless user experience.

The approach will be continuously reviewed and updated as the project evolves and new security considerations arise. 