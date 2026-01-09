import type { ProcessingProgress } from '../types/processing';

interface ProgressIndicatorProps {
    progress: ProcessingProgress;
    title: string;
}

export default function ProgressIndicator({ progress, title }: ProgressIndicatorProps) {
    const percentage = progress.totalItems > 0
        ? Math.round((progress.processedItems / progress.totalItems) * 100)
        : 0;

    const isComplete = progress.completedAt !== undefined;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {isComplete ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Complete
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Processing...
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold text-gray-900">{progress.processedItems}</p>
                    <p className="text-xs text-gray-500 uppercase">Processed</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-green-600">{progress.successCount}</p>
                    <p className="text-xs text-gray-500 uppercase">Success</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-red-600">{progress.failureCount}</p>
                    <p className="text-xs text-gray-500 uppercase">Failed</p>
                </div>
            </div>

            {/* Timestamp */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                Started: {new Date(progress.startedAt).toLocaleString()}
                {isComplete && progress.completedAt && (
                    <> • Completed: {new Date(progress.completedAt).toLocaleString()}</>
                )}
            </div>
        </div>
    );
}
