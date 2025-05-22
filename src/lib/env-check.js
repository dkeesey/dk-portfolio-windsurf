// Environment Variables Check
// This file should be imported as a module in the main page

/**
 * Logs environment variables to the console in development mode
 */
export function logEnvironmentVariables() {
  if (typeof window !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    console.log('-------- Environment Variables Check --------');

    // Check Supabase variables
    console.log('import.meta.env.SUPABASE_URL:', import.meta.env.SUPABASE_URL);
    console.log('import.meta.env.SUPABASE_ANON_KEY exists:', Boolean(import.meta.env.SUPABASE_ANON_KEY));
    console.log('import.meta.env.PUBLIC_SUPABASE_URL:', import.meta.env.PUBLIC_SUPABASE_URL);
    console.log('import.meta.env.PUBLIC_SUPABASE_ANON_KEY exists:', Boolean(import.meta.env.PUBLIC_SUPABASE_ANON_KEY));

    // Check Azure OpenAI variables
    console.log('import.meta.env.AZURE_OPENAI_API_KEY exists:', Boolean(import.meta.env.AZURE_OPENAI_API_KEY));
    console.log('import.meta.env.AZURE_OPENAI_ENDPOINT exists:', Boolean(import.meta.env.AZURE_OPENAI_ENDPOINT));
    console.log('import.meta.env.AZURE_OPENAI_DEPLOYMENT_NAME exists:', Boolean(import.meta.env.AZURE_OPENAI_DEPLOYMENT_NAME));

    // Check Analytics variables
    console.log('import.meta.env.PUBLIC_POSTHOG_API_KEY exists:', Boolean(import.meta.env.PUBLIC_POSTHOG_API_KEY));
    console.log('import.meta.env.PUBLIC_GA_TRACKING_ID exists:', Boolean(import.meta.env.PUBLIC_GA_TRACKING_ID));

    // Warn about missing critical variables
    if (!import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('WARNING: PUBLIC_SUPABASE_ANON_KEY is missing');
    }

    if (!import.meta.env.AZURE_OPENAI_API_KEY) {
      console.warn('WARNING: AZURE_OPENAI_API_KEY is missing');
    }

    console.log('------------------------------------------');
  }
}

// Self-executing function to run the check when the module is loaded
if (typeof window !== 'undefined') {
  try {
    logEnvironmentVariables();
  } catch (error) {
    console.error('Error checking environment variables:', error);
  }
}
