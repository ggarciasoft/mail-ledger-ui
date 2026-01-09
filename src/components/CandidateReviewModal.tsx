import { useState } from 'react';
import { X, Check, XCircle, Mail, Calendar, DollarSign, Store, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ExtractionCandidate } from '../types/extraction-candidate';
import ConfidenceMeter from './ConfidenceMeter';
import { useConfirmCandidate, useRejectCandidate } from '../hooks/use-extraction-candidates';

interface CandidateReviewModalProps {
    candidate: ExtractionCandidate | null;
    onClose: () => void;
}

const financialDataSchema = z.object({
    transactionDate: z.string().min(1, 'Transaction date is required'),
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().min(1, 'Currency is required'),
    merchant: z.string().min(1, 'Merchant name is required'),
    sourceBank: z.string().optional(),
});

type FinancialDataForm = z.infer<typeof financialDataSchema>;

export default function CandidateReviewModal({ candidate, onClose }: CandidateReviewModalProps) {
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const confirmMutation = useConfirmCandidate();
    const rejectMutation = useRejectCandidate();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<FinancialDataForm>({
        resolver: zodResolver(financialDataSchema),
        values: candidate ? {
            transactionDate: new Date(candidate.transactionDate).toISOString().split('T')[0],
            amount: candidate.amount,
            currency: candidate.currency,
            merchant: candidate.merchant,
            sourceBank: candidate.sourceBank || '',
        } : undefined,
    });

    if (!candidate) return null;

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    const handleConfirm = async (data: FinancialDataForm) => {
        try {
            await confirmMutation.mutateAsync({
                id: candidate.id,
                data: data,
            });
            onClose();
        } catch (error) {
            console.error('Failed to confirm candidate:', error);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return;

        try {
            await rejectMutation.mutateAsync({
                id: candidate.id,
                data: { reason: rejectionReason },
            });
            onClose();
        } catch (error) {
            console.error('Failed to reject candidate:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Review Extraction</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Source Email */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                                Source Email
                            </h3>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Subject</p>
                                    <p className="text-sm text-gray-900 mt-1">{candidate.emailSubject}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">From</p>
                                    <p className="text-sm text-gray-900 mt-1">{candidate.emailFrom}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Received</p>
                                    <p className="text-sm text-gray-900 mt-1">
                                        {candidate.emailReceivedAt && formatDate(candidate.emailReceivedAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <ConfidenceMeter confidence={candidate.confidence} />
                            </div>
                        </div>

                        {/* Right Column - Extracted Data Form */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Data</h3>

                            <form onSubmit={handleSubmit(handleConfirm)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Calendar className="w-4 h-4 inline mr-1" />
                                        Transaction Date *
                                    </label>
                                    <input
                                        {...register('transactionDate')}
                                        type="date"
                                        disabled={candidate.status !== 'Pending'}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                    {errors.transactionDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.transactionDate.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <DollarSign className="w-4 h-4 inline mr-1" />
                                            Amount *
                                        </label>
                                        <input
                                            {...register('amount', { valueAsNumber: true })}
                                            type="number"
                                            step="0.01"
                                            disabled={candidate.status !== 'Pending'}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                        {errors.amount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
                                        <input
                                            {...register('currency')}
                                            type="text"
                                            disabled={candidate.status !== 'Pending'}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                        {errors.currency && (
                                            <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Store className="w-4 h-4 inline mr-1" />
                                        Merchant *
                                    </label>
                                    <input
                                        {...register('merchant')}
                                        type="text"
                                        disabled={candidate.status !== 'Pending'}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                    {errors.merchant && (
                                        <p className="mt-1 text-sm text-red-600">{errors.merchant.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Building2 className="w-4 h-4 inline mr-1" />
                                        Source Bank
                                    </label>
                                    <input
                                        {...register('sourceBank')}
                                        type="text"
                                        disabled={candidate.status !== 'Pending'}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
                    {candidate.status === 'Pending' ? (
                        <>
                            <button
                                onClick={() => setShowRejectDialog(true)}
                                disabled={rejectMutation.isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center disabled:opacity-50"
                            >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit(handleConfirm)}
                                    disabled={confirmMutation.isPending}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center disabled:opacity-50"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    {isDirty ? 'Update & Confirm' : 'Confirm'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {candidate.status === 'Confirmed' ? (
                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium flex items-center">
                                        <Check className="w-4 h-4 mr-2" />
                                        Confirmed
                                    </span>
                                ) : (
                                    <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium flex items-center">
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Rejected
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reject Dialog */}
            {showRejectDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Extraction</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Please provide a reason for rejecting this extraction:
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                            placeholder="e.g., Incorrect amount, wrong merchant..."
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRejectDialog(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectionReason.trim() || rejectMutation.isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                            >
                                {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
