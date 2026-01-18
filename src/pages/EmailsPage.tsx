import { useState } from 'react';
import { useEmails, useDeleteEmail, useBulkDeleteEmails } from '../hooks/use-emails';
import { Mail, AlertCircle, ExternalLink, Trash2 } from 'lucide-react';
import EmailFilters from '../components/EmailFilters';
import EmailDetailModal from '../components/EmailDetailModal';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { Email } from '../types/email';

export default function EmailsPage() {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data, isLoading, error, params, setPage, setStatus, setSearch } = useEmails();
    const deleteMutation = useDeleteEmail();
    const bulkDeleteMutation = useBulkDeleteEmails();

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    const handleSelectAll = () => {
        if (!data?.items) return;

        // Only select pending emails
        const pendingEmails = data.items.filter(e => e.processingStatus === 'Pending');

        if (selectedIds.size === pendingEmails.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(pendingEmails.map(e => e.id)));
        }
    };

    const handleSelectEmail = (emailId: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(emailId)) {
            newSelected.delete(emailId);
        } else {
            newSelected.add(emailId);
        }
        setSelectedIds(newSelected);
    };

    const handleDeleteClick = (emailId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setEmailToDelete(emailId);
    };

    const confirmDelete = async () => {
        if (!emailToDelete) return;

        try {
            await deleteMutation.mutateAsync(emailToDelete);
            setSuccessMessage('Email deleted successfully');
            setTimeout(() => setSuccessMessage(null), 3000);
            setEmailToDelete(null);
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.error || 'Failed to delete email');
            setTimeout(() => setErrorMessage(null), 5000);
            setEmailToDelete(null);
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.size === 0) return;
        setShowBulkDeleteConfirm(true);
    };

    const confirmBulkDelete = async () => {
        try {
            const result = await bulkDeleteMutation.mutateAsync(Array.from(selectedIds));

            if (result.succeeded > 0) {
                setSuccessMessage(`Successfully deleted ${result.succeeded} email(s)`);
                setTimeout(() => setSuccessMessage(null), 3000);
            }

            if (result.failed > 0) {
                setErrorMessage(`Failed to delete ${result.failed} email(s). ${result.errors[0]?.error || ''}`);
                setTimeout(() => setErrorMessage(null), 5000);
            }

            setSelectedIds(new Set());
            setShowBulkDeleteConfirm(false);
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.error || 'Failed to delete emails');
            setTimeout(() => setErrorMessage(null), 5000);
            setShowBulkDeleteConfirm(false);
        }
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Emails</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load emails. Please try again later.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                    <div className="text-green-800">{successMessage}</div>
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <div className="text-red-800">{errorMessage}</div>
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Emails</h1>
                <p className="text-gray-600">View and manage synced Gmail emails</p>
            </div>

            {/* Filters */}
            <EmailFilters
                status={params.status}
                search={params.search}
                onStatusChange={setStatus}
                onSearchChange={setSearch}
            />

            {/* Bulk Action Toolbar */}
            {selectedIds.size > 0 && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between animate-slide-up">
                    <div className="text-blue-900 font-medium">
                        {selectedIds.size} email{selectedIds.size !== 1 ? 's' : ''} selected
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="px-4 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            Clear Selection
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            disabled={bulkDeleteMutation.isPending}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            {bulkDeleteMutation.isPending ? 'Deleting...' : 'Delete Selected'}
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500">Loading emails...</p>
                    </div>
                ) : !data?.items || data.items.length === 0 ? (
                    <EmptyState
                        icon={Mail}
                        title="No emails found"
                        description={
                            params.status || params.search
                                ? 'Try adjusting your filters to see more results.'
                                : 'Emails will appear here once they are synced from Gmail.'
                        }
                    />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.size > 0 && selectedIds.size === data.items.filter(e => e.processingStatus === 'Pending').length}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sender
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Received
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Confidence
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Has Extraction
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Financial
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Error
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.items.map((email) => (
                                        <tr
                                            key={email.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(email.id)}
                                                    onChange={() => handleSelectEmail(email.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    disabled={email.processingStatus !== 'Pending'}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                                />
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                                onClick={() => setSelectedEmail(email)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <StatusBadge status={email.processingStatus} />
                                                    <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                                                        {email.subject}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">{email.from}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{formatDate(email.receivedAt)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {email.classificationConfidence != null
                                                        ? `${(email.classificationConfidence * 100).toFixed(1)}%`
                                                        : '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {email.hasExtractionCandidate ? '✓' : '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {email.isFinancial ? '✓' : '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {email.processingError ? (
                                                    <span className="text-red-600" title={email.processingError}>
                                                        ⚠️
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`${import.meta.env.VITE_GMAIL_INBOX_URL}#inbox/${email.messageId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                        title="View in Gmail"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={(e) => handleDeleteClick(email.id, e)}
                                                        disabled={email.processingStatus !== 'Pending' || email.hasExtractionCandidate}
                                                        className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        title={
                                                            email.processingStatus !== 'Pending'
                                                                ? "Only pending emails can be deleted"
                                                                : email.hasExtractionCandidate
                                                                    ? "Cannot delete email with extraction candidates"
                                                                    : "Delete email"
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
            </div>

            {/* Detail Modal */}
            <EmailDetailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />

            {/* Delete Confirmation Dialog */}
            {emailToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Email?</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this email? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setEmailToDelete(null)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Delete Confirmation Dialog */}
            {showBulkDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Delete {selectedIds.size} Emails?</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete {selectedIds.size} email{selectedIds.size !== 1 ? 's' : ''}? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowBulkDeleteConfirm(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBulkDelete}
                                disabled={bulkDeleteMutation.isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {bulkDeleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
