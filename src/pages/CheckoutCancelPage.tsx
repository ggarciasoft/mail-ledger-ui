import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export function CheckoutCancelPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment was cancelled. No charges have been made to your account.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate('/settings?tab=subscription')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Back to Subscription
                    </button>

                    <button
                        onClick={() => navigate('/settings?tab=subscription')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
