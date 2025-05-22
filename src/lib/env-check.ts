// This file is used to check environment variables
export function checkEnvironmentVariables() {
    if (typeof window !== 'undefined') {
        console.log('Environment Variables Check:');
        console.log('PUBLIC_SUPABASE_URL:', import.meta.env.PUBLIC_SUPABASE_URL);
        console.log('PUBLIC_SUPABASE_ANON_KEY exists:', !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
        console.log('SUPABASE_URL:', import.meta.env.SUPABASE_URL);
        console.log('SUPABASE_ANON_KEY exists:', !!import.meta.env.SUPABASE_ANON_KEY);
    }
} 