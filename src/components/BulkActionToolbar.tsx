import { CheckCircle } from 'lucide-react';

interface BulkActionToolbarProps {
    selectedCount: number;
    onConfirm: () => void;
    onReject: () => void;
    onClear: () => void;
}

export default function BulkActionToolbar({
    selectedCount,
    onConfirm,
    onReject,
    onClear
}: BulkActionToolbarProps) {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 px-6 py-4 flex items-center gap-6">
                {/* Selected Count */}
                <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                        {selectedCount} selected
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow-md"
                    >
                        Confirm All
                    </button>

                    <button
                        onClick={onReject}
                        className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm hover:shadow-md"
                    >
                        Reject All
                    </button>

                    <button
                        onClick={onClear}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
