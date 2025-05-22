import { supabase } from './supabase';
import type { Recruiter } from './supabase';

// Types for authentication
export type AuthProvider = 'github' | 'linkedin';

export type AuthSession = {
    user: {
        id: string;
        email: string;
        name?: string;
    };
    token: string;
    expiresAt: number;
};

// Function to sign in with a social provider
export const signInWithSocialProvider = async (provider: AuthProvider): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${window.location.pathname}`,
            },
        });

        if (error) {
            console.error('Error signing in with social provider:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Error signing in with social provider:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred during sign in'
        };
    }
};

// Function to sign out
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error during sign out:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
    }
};

// Function to get the current session
export const getSession = async (): Promise<AuthSession | null> => {
    try {
        console.log("Getting session from Supabase...");
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error getting session:', error);
            return null;
        }

        if (!data.session) {
            console.log("No active session found in Supabase");
            return null;
        }

        console.log("Session found:", {
            userId: data.session.user.id,
            expiresAt: new Date(data.session.expires_at || 0).toISOString(),
            hasEmail: Boolean(data.session.user.email),
            hasMetadata: Boolean(data.session.user.user_metadata)
        });

        const user = data.session.user;

        // The session.expires_at value from Supabase is in seconds, not milliseconds
        // We need to multiply by 1000 to get the correct timestamp
        const expiresAt = data.session.expires_at ? 
                          new Date(data.session.expires_at * 1000).getTime() : 
                          Date.now() + (24 * 60 * 60 * 1000); // 24 hours from now
        
        // Log the expiration calculation
        console.log("Session expiration calculation:", {
            original: data.session.expires_at,
            calculated: expiresAt,
            now: Date.now(),
            isInFuture: expiresAt > Date.now()
        });
        
        return {
            user: {
                id: user.id,
                email: user.email || '',
                name: user.user_metadata?.full_name || user.user_metadata?.name,
            },
            token: data.session.access_token,
            expiresAt: expiresAt,
        };
    } catch (error) {
        console.error('Unexpected error getting session:', error);
        return null;
    }
};

// Function to get or create a recruiter from the current user
export const getOrCreateRecruiter = async (): Promise<Recruiter | null> => {
    const session = await getSession();

    if (!session) {
        return null;
    }

    // Try to get an existing recruiter
    const existingRecruiter = await supabase
        .from('recruiters')
        .select('*')
        .eq('email', session.user.email)
        .single();

    if (existingRecruiter.data) {
        // Update last active timestamp
        await supabase
            .from('recruiters')
            .update({ last_active: new Date().toISOString() })
            .eq('id', existingRecruiter.data.id);

        return existingRecruiter.data;
    }

    // Create a new recruiter
    const newRecruiter = await supabase
        .from('recruiters')
        .insert([{
            email: session.user.email,
            name: session.user.name || session.user.email.split('@')[0],
            last_active: new Date().toISOString(),
        }])
        .select()
        .single();

    if (newRecruiter.error) {
        console.error('Error creating recruiter:', newRecruiter.error);
        return null;
    }

    return newRecruiter.data;
}; 