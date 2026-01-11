interface JobProgressBarProps {
    progress: number;
    processedItems?: number;
    totalItems?: number;
    successCount?: number;
    failureCount?: number;
    className?: string;
}

export default function JobProgressBar({
    progress,
    processedItems,
    totalItems,
    successCount,
    failureCount,
    className = '',
}: JobProgressBarProps) {
    return (
        <div className={className}>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                <span>{progress}%</span>
                {totalItems !== undefined && processedItems !== undefined && (
                    <span>
                        {processedItems} / {totalItems} items
                    </span>
                )}
            </div>

            {/* Success/Failure counts */}
            {(successCount !== undefined || failureCount !== undefined) && (
                <div className="flex gap-3 mt-1 text-xs">
                    {successCount !== undefined && successCount > 0 && (
                        <span className="text-green-600">✓ {successCount} success</span>
                    )}
                    {failureCount !== undefined && failureCount > 0 && (
                        <span className="text-red-600">✗ {failureCount} failed</span>
                    )}
                </div>
            )}
        </div>
    );
}
