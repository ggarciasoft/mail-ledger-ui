import { useMutation } from '@tanstack/react-query';
import { getGoogleAuthUrl, getMicrosoftAuthUrl, handleGoogleCallback, handleMicrosoftCallback } from '../lib/oauth-api';
import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for Google OAuth authentication
 */
export function useGoogleOAuth() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: async () => {
            const { url, state } = await getGoogleAuthUrl();
            // Store state in sessionStorage for CSRF protection
            sessionStorage.setItem('oauth_state', state);
            // Redirect to Google OAuth
            window.location.href = url;
        },
        onError: (error) => {
            console.error('Google OAuth error:', error);
        },
    });

    const callbackMutation = useMutation({
        mutationFn: async (code: string) => {
            return await handleGoogleCallback(code);
        },
        onSuccess: (data) => {
            // Create user object from response
            const user = { id: data.userId } as any; // Temporary - will be populated by auto-login
            setAuth(user, data.accessToken, data.refreshToken);
            navigate('/');
        },
        onError: (error) => {
            console.error('Google OAuth callback error:', error);
            navigate('/login?error=oauth_failed');
        },
    });

    return {
        login: loginMutation.mutate,
        handleCallback: callbackMutation.mutate,
        isLoading: loginMutation.isPending || callbackMutation.isPending,
        error: loginMutation.error || callbackMutation.error,
    };
}

/**
 * Hook for Microsoft OAuth authentication
 */
export function useMicrosoftOAuth() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: async () => {
            const { url, state } = await getMicrosoftAuthUrl();
            // Store state in sessionStorage for CSRF protection
            sessionStorage.setItem('oauth_state', state);
            // Redirect to Microsoft OAuth
            window.location.href = url;
        },
        onError: (error) => {
            console.error('Microsoft OAuth error:', error);
        },
    });

    const callbackMutation = useMutation({
        mutationFn: async (code: string) => {
            return await handleMicrosoftCallback(code);
        },
        onSuccess: (data) => {
            // Create user object from response
            const user = { id: data.userId } as any; // Temporary - will be populated by auto-login
            setAuth(user, data.accessToken, data.refreshToken);
            navigate('/');
        },
        onError: (error) => {
            console.error('Microsoft OAuth callback error:', error);
            navigate('/login?error=oauth_failed');
        },
    });

    return {
        login: loginMutation.mutate,
        handleCallback: callbackMutation.mutate,
        isLoading: loginMutation.isPending || callbackMutation.isPending,
        error: loginMutation.error || callbackMutation.error,
    };
}
