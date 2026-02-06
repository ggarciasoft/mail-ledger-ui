import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMicrosoftOAuth } from '../hooks/use-oauth';

export default function MicrosoftCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleCallback } = useMicrosoftOAuth();

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Handle OAuth errors
        if (error) {
            console.error('Microsoft OAuth error:', error);
            navigate('/login?error=oauth_cancelled');
            return;
        }

        // Validate code and state
        if (!code || !state) {
            navigate('/login?error=invalid_oauth_response');
            return;
        }

        // Verify state for CSRF protection
        const storedState = sessionStorage.getItem('oauth_state');
        if (state !== storedState) {
            console.error('OAuth state mismatch');
            navigate('/login?error=oauth_state_mismatch');
            return;
        }

        // Clear stored state
        sessionStorage.removeItem('oauth_state');

        // Handle the callback
        handleCallback(code);
    }, [searchParams, navigate, handleCallback]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Completing Microsoft sign-in...</p>
            </div>
        </div>
    );
}
