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
    const [guestMode, setGuestMode] = React.useState(false);

    // Check authentication status on mount and when URL hash changes
    React.useEffect(() => {
        const checkAuth = async () => {
            console.log("Checking authentication state...");
            setIsLoading(true);
            setError(null);

            try {
                const session = await getSession();
                console.log("Session check result:", session ? "Session found" : "No session");

                if (session) {
                    console.log("Session expiration check:", { 
                        expiresAt: session.expiresAt, 
                        now: Date.now(),
                        difference: session.expiresAt - Date.now(),
                        isExpired: session.expiresAt < Date.now()
                    });
                    
                    // Handle expired sessions
                    if (session.expiresAt < Date.now()) {
                        console.log("Session is expired - attempting to refresh...");
                        
                        // Try to refresh the session
                        try {
                            const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
                            
                            if (refreshedSession) {
                                console.log("Session refreshed successfully");
                                // Continue with the refreshed session
                            } else {
                                console.log("Session refresh failed - user must sign in again");
                                setIsAuthenticated(false);
                                setRecruiter(null);
                                setError({
                                    code: 'session_expired',
                                    message: 'Your session has expired. Please sign in again.'
                                });
                                return;
                            }
                        } catch (refreshError) {
                            console.error("Error refreshing session:", refreshError);
                            setIsAuthenticated(false);
                            setRecruiter(null);
                            setError({
                                code: 'session_expired',
                                message: 'Your session has expired. Please sign in again.'
                            });
                            return;
                        }
                    }

                    console.log("Session is valid, setting authenticated state");
                    setIsAuthenticated(true);

                    // Skip the database operations for now
                    // The 'recruiters' table is missing in your Supabase project
                    console.log("Skipping recruiter data fetch due to missing table");
                    
                    // Use a placeholder recruiter object
                    const placeholderRecruiter = {
                      id: session.user.id,
                      created_at: new Date().toISOString(),
                      email: session.user.email,
                      name: session.user.name || session.user.email.split('@')[0],
                      last_active: new Date().toISOString()
                    };
                    
                    setRecruiter(placeholderRecruiter);
                } else {
                    console.log("No session found, setting unauthenticated state");
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

        // Check auth immediately
        checkAuth();

        // Set up interval to periodically check session validity
        const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

        // Check auth when hash changes (which happens after OAuth redirect)
        const handleHashChange = () => {
            console.log("URL hash changed, rechecking auth");
            checkAuth();
        };
        
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', handleHashChange);
        }

        return () => {
            clearInterval(intervalId);
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', handleHashChange);
            }
        };
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

    // Enable guest mode for testing
    const enableGuestMode = React.useCallback(() => {
        console.log("Enabling guest mode for testing...");
        setGuestMode(true);
        setIsAuthenticated(true);
        setIsLoading(false);
        
        // Create a placeholder recruiter object for testing
        const guestRecruiter: Recruiter = {
            id: 'guest-' + Date.now(),
            created_at: new Date().toISOString(),
            email: 'guest@example.com',
            name: 'Guest User',
            last_active: new Date().toISOString()
        };
        
        setRecruiter(guestRecruiter);
        
        // Notify any listeners that guest mode is enabled
        window.dispatchEvent(new CustomEvent('guestModeEnabled'));
    }, []);
    
    // Disable guest mode
    const disableGuestMode = React.useCallback(() => {
        console.log("Disabling guest mode...");
        setGuestMode(false);
        setIsAuthenticated(false);
        setRecruiter(null);
    }, []);

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
        enableGuestMode,
        disableGuestMode,
        guestMode
    };
} 