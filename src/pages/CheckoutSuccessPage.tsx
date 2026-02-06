import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function CheckoutSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // Redirect to subscription page after 3 seconds
        const timer = setTimeout(() => {
            navigate('/settings?tab=subscription');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your subscription has been activated. You'll be redirected to your
                    subscription page shortly.
                </p>

                {sessionId && (
                    <p className="text-sm text-gray-500 mb-4">
                        Session ID: {sessionId}
                    </p>
                )}

                <button
                    onClick={() => navigate('/settings?tab=subscription')}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Go to Subscription
                </button>
            </div>
        </div>
    );
}
