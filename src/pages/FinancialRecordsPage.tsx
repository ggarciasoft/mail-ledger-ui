import { useState } from 'react';
import { useFinancialRecords } from '../hooks/use-financial-records';
import { DollarSign, AlertCircle } from 'lucide-react';
import RecordFilters from '../components/RecordFilters';
import RecordDetailModal from '../components/RecordDetailModal';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { FinancialRecord } from '../types/financial-record';

export default function FinancialRecordsPage() {
    const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null);
    const { data, isLoading, error, setPage, setFilters } = useFinancialRecords();

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
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Records</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load financial records. Please try again later.'}
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Records</h1>
                <p className="text-gray-600">Immutable source of truth for confirmed transactions</p>
            </div>

            {/* Filters */}
            <RecordFilters onFiltersChange={setFilters} />

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500">Loading records...</p>
                    </div>
                ) : !data?.items || data.items.length === 0 ? (
                    <EmptyState
                        icon={DollarSign}
                        title="No records found"
                        description="Financial records will appear here once extraction candidates are confirmed."
                    />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Merchant
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Source
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.items.map((record) => (
                                        <tr
                                            key={record.id}
                                            onClick={() => setSelectedRecord(record)}
                                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(record.transactionDate)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{record.merchant}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {formatCurrency(record.amount, record.currency)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{record.category || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {record.email?.subject || '-'}
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
            <RecordDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
        </div>
    );
}
