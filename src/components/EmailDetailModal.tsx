import { X, Calendar, User, Mail, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import type { Email } from '../types/email';
import StatusBadge from './StatusBadge';

interface EmailDetailModalProps {
    email: Email | null;
    onClose: () => void;
}

export default function EmailDetailModal({ email, onClose }: EmailDetailModalProps) {
    if (!email) return null;

    const formatDate = (dateString: string) => {
        return dateString ? new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString)) : '';
    };

    const gmailUrl = `${import.meta.env.VITE_GMAIL_INBOX_URL}#inbox/${email.messageId}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Email Details</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Status */}
                    <div className="mb-6">
                        <StatusBadge status={email.processingStatus} />
                    </div>

                    {/* Subject */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{email.subject}</h3>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start">
                            <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Sender</p>
                                <p className="text-sm text-gray-900">{email.from}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Received</p>
                                <p className="text-sm text-gray-900">{formatDate(email.receivedAt)}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Gmail Message ID</p>
                                <p className="text-sm text-gray-900 font-mono break-all">{email.gmailMessageId}</p>
                            </div>
                        </div>

                        {email.processedAt && (
                            <div className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Processed</p>
                                    <p className="text-sm text-gray-900">{formatDate(email.processedAt)}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Classification Result */}
                    {email.classificationResult && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Classification Result</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-900">{email.classificationResult}</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {email.errorMessage && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                                Error Details
                            </h4>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-900">{email.errorMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Processing Error */}
                    {email.processingError && (
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                                Processing Error
                            </h4>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-900">{email.processingError}</p>
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email ID:</span>
                                <span className="text-gray-900 font-mono">{email.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Created:</span>
                                <span className="text-gray-900">{formatDate(email.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
                    <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View in Gmail
                    </a>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
