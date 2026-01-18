import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authApi } from '../lib/auth-api';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            const email = searchParams.get('email');

            if (!token || !email) {
                setStatus('error');
                setErrorMessage('Invalid verification link. Missing token or email.');
                return;
            }

            try {
                await authApi.verifyEmail({ token, email });
                setStatus('success');

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error: any) {
                setStatus('error');
                setErrorMessage(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    'Failed to verify email. The link may have expired.'
                );
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center">
                    {status === 'loading' && (
                        <>
                            <Loader2 className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Verifying Your Email
                            </h1>
                            <p className="text-gray-600">
                                Please wait while we verify your email address...
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Email Verified! ✅
                            </h1>
                            <p className="text-gray-600 mb-4">
                                Your email has been successfully verified. Your account is now active!
                            </p>
                            <p className="text-sm text-gray-500">
                                Redirecting to login page in 3 seconds...
                            </p>
                            <Link
                                to="/login"
                                className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                Go to Login
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Verification Failed
                            </h1>
                            <p className="text-red-600 mb-6">{errorMessage}</p>
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                                >
                                    Go to Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                >
                                    Register Again
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
