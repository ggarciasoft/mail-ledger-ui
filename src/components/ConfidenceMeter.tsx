interface ConfidenceMeterProps {
    confidence: number;
    showLabel?: boolean;
}

export default function ConfidenceMeter({ confidence, showLabel = true }: ConfidenceMeterProps) {
    const percentage = Math.round(confidence * 100);

    const getColor = () => {
        if (confidence >= 0.8) return 'bg-green-500';
        if (confidence >= 0.6) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getTextColor = () => {
        if (confidence >= 0.8) return 'text-green-700';
        if (confidence >= 0.6) return 'text-yellow-700';
        return 'text-red-700';
    };

    return (
        <div>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Confidence</span>
                    <span className={`text-sm font-semibold ${getTextColor()}`}>{percentage}%</span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all ${getColor()}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
