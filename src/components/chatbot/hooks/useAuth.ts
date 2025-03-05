import * as React from 'react';
import { signInWithSocialProvider, signOut as authSignOut, getSession, getOrCreateRecruiter } from '@/lib/auth';
import type { AuthProvider } from '@/lib/auth';
import type { Recruiter } from '@/lib/supabase';

export type AuthError = {
    code: 'session_expired' | 'sign_in_canceled' | 'network_error' | 'unknown';
    message: string;
};

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [recruiter, setRecruiter] = React.useState<Recruiter | null>(null);
    const [error, setError] = React.useState<AuthError | null>(null);

    // Check authentication status on mount
    React.useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const session = await getSession();

                if (session) {
                    // Check if session is expired
                    if (session.expiresAt < Date.now()) {
                        setIsAuthenticated(false);
                        setRecruiter(null);
                        setError({
                            code: 'session_expired',
                            message: 'Your session has expired. Please sign in again.'
                        });
                        return;
                    }

                    setIsAuthenticated(true);

                    // Get or create recruiter profile
                    const recruiterData = await getOrCreateRecruiter();
                    setRecruiter(recruiterData);
                } else {
                    setIsAuthenticated(false);
                    setRecruiter(null);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setRecruiter(null);
                setError({
                    code: 'unknown',
                    message: error instanceof Error ? error.message : 'An unknown error occurred while checking authentication'
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        // Set up interval to periodically check session validity
        const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

        return () => clearInterval(intervalId);
    }, []);

    // Sign in with a social provider
    const signIn = async (provider: AuthProvider) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signInWithSocialProvider(provider);

            if (result.success) {
                // The user will be redirected to the provider's auth page
                return true;
            } else {
                console.error('Error signing in:', result.error);
                setError({
                    code: 'sign_in_canceled',
                    message: result.error || 'Sign in was canceled or failed'
                });
                return false;
            }
        } catch (error) {
            console.error('Unexpected error during sign in:', error);
            setError({
                code: 'network_error',
                message: error instanceof Error ? error.message : 'A network error occurred during sign in'
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Sign out
    const signOut = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authSignOut();

            if (result.success) {
                setIsAuthenticated(false);
                setRecruiter(null);
                return true;
            } else {
                console.error('Error signing out:', result.error);
                setError({
                    code: 'unknown',
                    message: result.error || 'An error occurred during sign out'
                });
                return false;
            }
        } catch (error) {
            console.error('Unexpected error during sign out:', error);
            setError({
                code: 'network_error',
                message: error instanceof Error ? error.message : 'A network error occurred during sign out'
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Clear any authentication errors
    const clearError = React.useCallback(() => {
        setError(null);
    }, []);

    return {
        isAuthenticated,
        isLoading,
        recruiter,
        error,
        signIn,
        signOut,
        clearError,
    };
} 