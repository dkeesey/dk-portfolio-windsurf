// Environment Variables Check
// This file should be included directly in the HTML with a script tag

(function () {
    // Only run in development mode
    if (window.ENV_DEV) {
        console.log('-------- Environment Variables Check --------');

        // Check Supabase variables
        console.log('SUPABASE_URL exists:', Boolean(window.ENV_SUPABASE_URL));
        console.log('SUPABASE_ANON_KEY exists:', Boolean(window.ENV_SUPABASE_ANON_KEY));
        console.log('PUBLIC_SUPABASE_URL exists:', Boolean(window.ENV_PUBLIC_SUPABASE_URL));
        console.log('PUBLIC_SUPABASE_ANON_KEY exists:', Boolean(window.ENV_PUBLIC_SUPABASE_ANON_KEY));

        // Check Azure OpenAI variables
        console.log('AZURE_OPENAI_API_KEY exists:', Boolean(window.ENV_AZURE_OPENAI_API_KEY));
        console.log('AZURE_OPENAI_ENDPOINT exists:', Boolean(window.ENV_AZURE_OPENAI_ENDPOINT));
        console.log('AZURE_OPENAI_DEPLOYMENT_NAME exists:', Boolean(window.ENV_AZURE_OPENAI_DEPLOYMENT_NAME));

        // Check Analytics variables
        console.log('PUBLIC_POSTHOG_API_KEY exists:', Boolean(window.ENV_PUBLIC_POSTHOG_API_KEY));
        console.log('PUBLIC_GA_TRACKING_ID exists:', Boolean(window.ENV_PUBLIC_GA_TRACKING_ID));

        // Warn about missing critical variables
        if (!window.ENV_PUBLIC_SUPABASE_ANON_KEY) {
            console.warn('WARNING: PUBLIC_SUPABASE_ANON_KEY is missing');
        }

        if (!window.ENV_AZURE_OPENAI_API_KEY) {
            console.warn('WARNING: AZURE_OPENAI_API_KEY is missing');
        }

        console.log('------------------------------------------');
    }
})(); 