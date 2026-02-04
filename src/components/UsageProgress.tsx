interface UsageProgressProps {
    label: string;
    current: number;
    limit: number;
    className?: string;
}

export function UsageProgress({
    label,
    current,
    limit,
    className = '',
}: UsageProgressProps) {
    const isUnlimited = limit === -1 || limit === Number.MAX_SAFE_INTEGER;

    const percentage = isUnlimited
        ? 0
        : Math.min((current / limit) * 100, 100);
    const isNearLimit = percentage >= 80;
    const isAtLimit = percentage >= 100;

    const getBarColor = () => {
        if (isAtLimit) return 'bg-red-500';
        if (isNearLimit) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    const getTextColor = () => {
        if (isAtLimit) return 'text-red-700';
        if (isNearLimit) return 'text-yellow-700';
        return 'text-gray-700';
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className={`text-sm font-semibold ${getTextColor()}`}>
                    {isUnlimited ? (
                        <span className="text-green-600">Unlimited</span>
                    ) : (
                        <>
                            {current.toLocaleString()} / {limit.toLocaleString()}
                        </>
                    )}
                </span>
            </div>
            {!isUnlimited && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor()}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            )}
        </div>
    );
}
