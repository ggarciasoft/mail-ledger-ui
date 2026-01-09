import { X, Calendar, DollarSign, Store, Tag, Mail, Lock } from 'lucide-react';
import type { FinancialRecord } from '../types/financial-record';

interface RecordDetailModalProps {
    record: FinancialRecord | null;
    onClose: () => void;
}

export default function RecordDetailModal({ record, onClose }: RecordDetailModalProps) {
    if (!record) return null;

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return dateString ? new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString)) : '';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Lock className="w-6 h-6 text-white mr-2" />
                        <h2 className="text-xl font-semibold text-white">Financial Record</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
                    {/* Immutable Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <Lock className="w-3 h-3 mr-1" />
                            Immutable Record
                        </span>
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Transaction Date</p>
                                        <p className="text-sm text-gray-900">{formatDate(record.transactionDate)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <DollarSign className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Amount</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {formatCurrency(record.amount, record.currency)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Store className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Merchant</p>
                                        <p className="text-sm text-gray-900">{record.merchant}</p>
                                    </div>
                                </div>

                                {record.category && (
                                    <div className="flex items-start">
                                        <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Category</p>
                                            <p className="text-sm text-gray-900">{record.category}</p>
                                        </div>
                                    </div>
                                )}

                                {record.sourceBank && (
                                    <div className="flex items-start">
                                        <div className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex items-center justify-center">
                                            🏦
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Source Bank</p>
                                            <p className="text-sm text-gray-900">{record.sourceBank}</p>
                                        </div>
                                    </div>
                                )}

                                {record.type && (
                                    <div className="flex items-start">
                                        <div className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex items-center justify-center">
                                            💳
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Transaction Type</p>
                                            <p className="text-sm text-gray-900">{record.type}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {record.description && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{record.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Source Email */}
                        {record.email && (
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                                    Source Email
                                </h3>

                                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                                    <div>
                                        <p className="text-xs font-medium text-blue-700 uppercase">Subject</p>
                                        <p className="text-sm text-blue-900 mt-1">{record.email.subject}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-blue-700 uppercase">From</p>
                                        <p className="text-sm text-blue-900 mt-1">{record.email.sender}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-blue-700 uppercase">Received</p>
                                        <p className="text-sm text-blue-900 mt-1">{formatDate(record.email.receivedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Record Metadata</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Record ID:</span>
                                    <span className="text-gray-900 font-mono">{record.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Confirmed:</span>
                                    <span className="text-gray-900">{formatDate(record.confirmedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
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
