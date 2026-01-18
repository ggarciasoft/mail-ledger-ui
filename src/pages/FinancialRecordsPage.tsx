import { useState } from 'react';
import { useFinancialRecords } from '../hooks/use-financial-records';
import { DollarSign, AlertCircle, Download } from 'lucide-react';
import RecordFilters from '../components/RecordFilters';
import RecordDetailModal from '../components/RecordDetailModal';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import type { FinancialRecord } from '../types/financial-record';
import { financialRecordApi } from '../lib/financial-record-api';
import { FeatureGate } from '../components/FeatureGate';

export default function FinancialRecordsPage() {
    const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);
    const { data, isLoading, error, setPage, setFilters, filters } = useFinancialRecords();

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

    const handleExport = async (format: 'csv' | 'json') => {
        try {
            setIsExporting(true);
            setExportError(null);

            // Extract current filter values from React Query state or filters state
            await financialRecordApi.exportRecords(format, filters);

        } catch (err: any) {
            setExportError(err?.response?.data?.error || 'Failed to export records');
        } finally {
            setIsExporting(false);
        }
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
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Records</h1>
                    <p className="text-gray-600">Immutable source of truth for confirmed transactions</p>
                </div>

                <FeatureGate feature="export">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleExport('csv')}
                            disabled={isExporting || !data?.items || data.items.length === 0}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isExporting ? 'Exporting...' : 'Export CSV'}
                        </button>
                        <button
                            onClick={() => handleExport('json')}
                            disabled={isExporting || !data?.items || data.items.length === 0}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isExporting ? 'Exporting...' : 'Export JSON'}
                        </button>
                    </div>
                </FeatureGate>
            </div>

            {/* Export Error */}
            {exportError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <div className="text-red-800">{exportError}</div>
                </div>
            )}

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
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Source
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Source Account
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
                                                <div className="text-sm text-gray-500">{record.type || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {record.sourceBank || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 font-mono truncate max-w-xs">
                                                    {record.sourceAccount || '-'}
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
