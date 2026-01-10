import { useState } from 'react';
import { X } from 'lucide-react';

interface RejectDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (reason?: string) => void;
}

export default function RejectDialog({
    open,
    onClose,
    onConfirm
}: RejectDialogProps) {
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        onConfirm(reason || undefined);
        setReason('');
        onClose();
    };

    const handleClose = () => {
        setReason('');
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Reject Candidates</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Optionally provide a reason for rejecting these candidates:
                    </p>

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g., Duplicate transaction, Incorrect amount..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}
