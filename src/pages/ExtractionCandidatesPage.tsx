import { useState } from 'react';
import { useExtractionCandidates, useBulkConfirmCandidates, useBulkRejectCandidates } from '../hooks/use-extraction-candidates';
import { useMySubscription } from '../hooks/use-subscription';
import { FileCheck, AlertCircle, Mail } from 'lucide-react';
import CandidateReviewModal from '../components/CandidateReviewModal';
import ConfidenceMeter from '../components/ConfidenceMeter';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import BulkActionToolbar from '../components/BulkActionToolbar';
import RejectDialog from '../components/RejectDialog';
import type { ExtractionCandidate } from '../types/extraction-candidate';

export default function ExtractionCandidatesPage() {
    const [selectedCandidate, setSelectedCandidate] = useState<ExtractionCandidate | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data, isLoading, error, params, setPage } = useExtractionCandidates();
    const { data: subscription } = useMySubscription();
    const bulkConfirm = useBulkConfirmCandidates();
    const bulkReject = useBulkRejectCandidates();

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const handleToggleSelect = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (!data?.items) return;

        // Get all pending candidate IDs
        const pendingIds = data.items
            .filter(candidate => candidate.status === 'Pending')
            .map(candidate => candidate.id);

        // If all pending are selected, deselect all; otherwise select all pending
        const allPendingSelected = pendingIds.every(id => selectedIds.includes(id)) && pendingIds.length > 0;

        if (allPendingSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(pendingIds);
        }
    };

    const handleBulkConfirm = async () => {
        try {
            await bulkConfirm.mutateAsync(selectedIds);
            setSelectedIds([]);
            setErrorMessage(null);
        } catch (error: any) {
            console.error('Bulk confirm failed:', error);
            const message = error?.response?.data?.message || error?.message || 'Failed to confirm candidates';
            setErrorMessage(message);
            // Auto-dismiss after 10 seconds
            setTimeout(() => setErrorMessage(null), 10000);
        }
    };

    const handleBulkReject = async (reason?: string) => {
        try {
            await bulkReject.mutateAsync({ candidateIds: selectedIds, reason });
            setSelectedIds([]);
            setShowRejectDialog(false);
            setErrorMessage(null);
        } catch (error: any) {
            console.error('Bulk reject failed:', error);
            const message = error?.response?.data?.message || error?.message || 'Failed to reject candidates';
            setErrorMessage(message);
            // Auto-dismiss after 10 seconds
            setTimeout(() => setErrorMessage(null), 10000);
        }
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Candidates</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load extraction candidates. Please try again later.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const pendingCount = data?.items.filter(c => c.status === 'Pending').length || 0;
    const allPendingSelected = data?.items
        .filter(c => c.status === 'Pending')
        .every(c => selectedIds.includes(c.id)) && pendingCount > 0;

    const canUseBulkOperations = subscription?.subscriptionPlan?.canUseBulkOperations ?? false;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Extraction Candidates</h1>
                    <p className="text-gray-600">Review and confirm AI-extracted financial data</p>
                </div>

                {/* Select All Button */}
                {pendingCount > 0 && (
                    <div className="relative group">
                        <button
                            onClick={handleSelectAll}
                            disabled={!canUseBulkOperations}
                            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${canUseBulkOperations
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={allPendingSelected}
                                readOnly
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                            />
                            {allPendingSelected ? 'Deselect All' : 'Select All'}
                        </button>
                        {!canUseBulkOperations && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Bulk operations is disabled for your subscription plan.
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Error Notification */}
            {errorMessage && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start animate-slide-up">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-red-900 font-semibold mb-1">Bulk Operation Failed</h3>
                        <p className="text-red-700 text-sm">{errorMessage}</p>
                        {errorMessage.toLowerCase().includes('subscription') && (
                            <a
                                href="/settings"
                                className="inline-block mt-2 text-sm text-red-800 underline hover:text-red-900"
                            >
                                Upgrade your subscription →
                            </a>
                        )}
                    </div>
                    <button
                        onClick={() => setErrorMessage(null)}
                        className="text-red-600 hover:text-red-800"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Bulk Action Toolbar */}
            {selectedIds.length > 0 && canUseBulkOperations && (
                <BulkActionToolbar
                    selectedCount={selectedIds.length}
                    onConfirm={handleBulkConfirm}
                    onReject={() => setShowRejectDialog(true)}
                    onClear={() => setSelectedIds([])}
                />
            )}

            {/* Candidates Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            ) : !data?.items || data.items.length === 0 ? (
                <EmptyState
                    icon={FileCheck}
                    title="No candidates found"
                    description="Extraction candidates will appear here once emails are processed by the AI."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {data.items.map((candidate) => (
                            <div
                                key={candidate.id}
                                onClick={() => setSelectedCandidate(candidate)}
                                className={`bg-white rounded-lg border p-6 hover:shadow-lg cursor-pointer transition-all relative ${selectedIds.includes(candidate.id)
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                {/* Checkbox */}
                                {candidate.status === 'Pending' && canUseBulkOperations && (
                                    <div className="absolute top-4 right-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(candidate.id)}
                                            onChange={(e) => handleToggleSelect(candidate.id, e as any)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600 cursor-pointer"
                                        />
                                    </div>
                                )}

                                {/* Email Info */}
                                <div className="mb-4 pr-8">
                                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                                        {candidate.emailSubject}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{candidate.emailFrom}</p>

                                    {/* View Email Link */}
                                    <a
                                        href={`${import.meta.env.VITE_GMAIL_INBOX_URL}#inbox/${candidate.emailMessageId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
                                    >
                                        <Mail className="w-3 h-3" />
                                        View in Gmail
                                    </a>
                                </div>

                                {/* Extracted Data */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Amount:</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(candidate.amount, candidate.currency)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Merchant:</span>
                                        <span className="text-sm font-medium text-gray-900 truncate ml-2">
                                            {candidate.merchant}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Date:</span>
                                        <span className="text-sm text-gray-900">
                                            {formatDate(candidate.transactionDate)}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="mb-3">
                                    {candidate.status === 'Pending' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Pending
                                        </span>
                                    )}
                                    {candidate.status === 'Confirmed' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Confirmed
                                        </span>
                                    )}
                                    {candidate.status === 'Rejected' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Rejected
                                        </span>
                                    )}
                                </div>

                                {/* Confidence */}
                                <ConfidenceMeter confidence={candidate.confidence} showLabel={false} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {data.totalPages > 1 && (
                        <Pagination
                            currentPage={data.page}
                            totalPages={data.totalPages}
                            onPageChange={setPage}
                        />
                    )}
                </>
            )}

            {/* Review Modal */}
            <CandidateReviewModal
                candidate={selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
            />

            {/* Reject Dialog */}
            <RejectDialog
                open={showRejectDialog}
                onClose={() => setShowRejectDialog(false)}
                onConfirm={handleBulkReject}
            />
        </div>
    );
}
