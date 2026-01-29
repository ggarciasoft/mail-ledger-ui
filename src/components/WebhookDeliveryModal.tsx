import { useState } from 'react';
import { X, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWebhookDeliveries } from '../hooks/use-webhooks';
import { WebhookDeliveryStatus } from '../types/webhook';

interface WebhookDeliveryModalProps {
    webhookId: string;
    webhookUrl: string;
    onClose: () => void;
}

export default function WebhookDeliveryModal({
    webhookId,
    webhookUrl,
    onClose,
}: WebhookDeliveryModalProps) {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<WebhookDeliveryStatus | undefined>();

    const { data, isLoading } = useWebhookDeliveries(webhookId, {
        status: statusFilter,
        page,
        pageSize: 20,
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'Failed':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'Pending':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success':
                return 'bg-green-100 text-green-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const totalPages = data ? Math.ceil(data.totalCount / data.pageSize) : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Delivery History
                        </h2>
                        <p className="text-sm text-gray-600 mt-1 truncate max-w-md">
                            {webhookUrl}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Filter by status:
                        </label>
                        <select
                            value={statusFilter || ''}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value ? (e.target.value as WebhookDeliveryStatus) : undefined
                                )
                            }
                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All</option>
                            <option value={WebhookDeliveryStatus.Success}>Success</option>
                            <option value={WebhookDeliveryStatus.Failed}>Failed</option>
                            <option value={WebhookDeliveryStatus.Pending}>Pending</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-6">
                            <div className="animate-pulse space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    ) : !data || data.deliveries.length === 0 ? (
                        <div className="p-12 text-center">
                            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No deliveries yet
                            </h3>
                            <p className="text-gray-600">
                                Webhook deliveries will appear here when events are triggered.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {data.deliveries.map((delivery) => (
                                <div key={delivery.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            {getStatusIcon(delivery.status)}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-gray-900">
                                                        {delivery.eventType}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                                                            delivery.status
                                                        )}`}
                                                    >
                                                        {delivery.status}
                                                    </span>
                                                </div>

                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <div>
                                                        Created:{' '}
                                                        {new Date(delivery.createdAt).toLocaleString()}
                                                    </div>
                                                    {delivery.lastAttemptAt && (
                                                        <div>
                                                            Last attempt:{' '}
                                                            {new Date(delivery.lastAttemptAt).toLocaleString()}
                                                        </div>
                                                    )}
                                                    <div>Attempts: {delivery.attemptCount}</div>
                                                    {delivery.responseStatusCode && (
                                                        <div>
                                                            Response status: {delivery.responseStatusCode}
                                                        </div>
                                                    )}
                                                    {delivery.errorMessage && (
                                                        <div className="text-red-600 mt-2">
                                                            Error: {delivery.errorMessage}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {data && data.totalCount > data.pageSize && (
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {(page - 1) * data.pageSize + 1} to{' '}
                            {Math.min(page * data.pageSize, data.totalCount)} of{' '}
                            {data.totalCount} deliveries
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
