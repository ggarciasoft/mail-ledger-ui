import { AlertCircle, ArrowUpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradePromptProps {
    feature: string;
    message?: string;
    className?: string;
}

export function UpgradePrompt({
    feature,
    message,
    className = '',
}: UpgradePromptProps) {
    const defaultMessage = `${feature} is not available on your current plan.`;

    return (
        <div
            className={`bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 ${className}`}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Upgrade Required
                    </h3>
                    <p className="text-gray-700 mb-4">{message || defaultMessage}</p>
                    <Link
                        to="/subscription"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                    >
                        <ArrowUpCircle className="h-5 w-5" />
                        Upgrade Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
