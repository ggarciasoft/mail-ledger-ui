import { useState } from 'react';
import { useExtractionCandidates } from '../hooks/use-extraction-candidates';
import { FileCheck, AlertCircle } from 'lucide-react';
import CandidateReviewModal from '../components/CandidateReviewModal';
import ConfidenceMeter from '../components/ConfidenceMeter';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { ExtractionCandidate } from '../types/extraction-candidate';

export default function ExtractionCandidatesPage() {
    const [selectedCandidate, setSelectedCandidate] = useState<ExtractionCandidate | null>(null);
    const { data, isLoading, error, params, setPage } = useExtractionCandidates();

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

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Extraction Candidates</h1>
                <p className="text-gray-600">Review and confirm AI-extracted financial data</p>
            </div>

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
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all"
                            >
                                {/* Email Info */}
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                                        {candidate.emailSubject}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{candidate.emailFrom}</p>
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
        </div>
    );
}
