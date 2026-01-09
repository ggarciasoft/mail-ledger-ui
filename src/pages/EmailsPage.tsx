import { useState } from 'react';
import { useEmails } from '../hooks/use-emails';
import { Mail, AlertCircle } from 'lucide-react';
import EmailFilters from '../components/EmailFilters';
import EmailDetailModal from '../components/EmailDetailModal';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { Email } from '../types/email';

export default function EmailsPage() {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const { data, isLoading, error, params, setPage, setStatus, setSearch } = useEmails();

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
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

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500">Loading emails...</p>
                    </div>
                ) : !data?.emails || data.emails.length === 0 ? (
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
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.emails.map((email) => (
                                        <tr
                                            key={email.id}
                                            onClick={() => setSelectedEmail(email)}
                                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                                                    {email.subject}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">{email.sender}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{formatDate(email.receivedAt)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={email.status} />
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
        </div>
    );
}
