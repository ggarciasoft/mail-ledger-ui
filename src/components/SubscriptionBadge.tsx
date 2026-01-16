import { SubscriptionTier } from '../types/subscription';

interface SubscriptionBadgeProps {
    tier: string;
    className?: string;
}

export function SubscriptionBadge({ tier, className = '' }: SubscriptionBadgeProps) {
    const getBadgeStyles = () => {
        switch (tier) {
            case SubscriptionTier.Free:
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case SubscriptionTier.Basic:
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case SubscriptionTier.Pro:
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case SubscriptionTier.Enterprise:
                return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-900 border-orange-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getBadgeStyles()} ${className}`}
        >
            {tier}
        </span>
    );
}
