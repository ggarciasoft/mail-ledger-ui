import { useState } from 'react';
import { Trash2, Power, PowerOff, History } from 'lucide-react';
import {
    useDeleteWebhookEndpoint,
    useToggleWebhookEndpoint,
} from '../hooks/use-webhooks';
import type { WebhookEndpoint } from '../types/webhook';
import WebhookDeliveryModal from './WebhookDeliveryModal';

interface WebhookCardProps {
    webhook: WebhookEndpoint;
}

export default function WebhookCard({ webhook }: WebhookCardProps) {
    const [showDeliveries, setShowDeliveries] = useState(false);
    const deleteWebhook = useDeleteWebhookEndpoint();
    const toggleWebhook = useToggleWebhookEndpoint();

    const handleDelete = async () => {
        if (
            confirm(
                'Are you sure you want to delete this webhook? This action cannot be undone.'
            )
        ) {
            await deleteWebhook.mutateAsync(webhook.id);
        }
    };

    const handleToggle = async () => {
        await toggleWebhook.mutateAsync({
            id: webhook.id,
            isActive: !webhook.isActive,
        });
    };

    return (
        <>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 truncate max-w-md">
                                {webhook.url}
                            </h3>
                            {webhook.isActive ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    Inactive
                                </span>
                            )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {webhook.events.map((event) => (
                                <span
                                    key={event}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                                >
                                    {event}
                                </span>
                            ))}
                        </div>

                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                            <span>
                                Created {new Date(webhook.createdAt).toLocaleDateString()}
                            </span>
                            {webhook.lastTriggeredAt && (
                                <span>
                                    Last triggered{' '}
                                    {new Date(webhook.lastTriggeredAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={() => setShowDeliveries(true)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="View delivery history"
                        >
                            <History className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleToggle}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title={webhook.isActive ? 'Disable webhook' : 'Enable webhook'}
                        >
                            {webhook.isActive ? (
                                <PowerOff className="w-4 h-4" />
                            ) : (
                                <Power className="w-4 h-4" />
                            )}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete webhook"
                            disabled={deleteWebhook.isPending}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {showDeliveries && (
                <WebhookDeliveryModal
                    webhookId={webhook.id}
                    webhookUrl={webhook.url}
                    onClose={() => setShowDeliveries(false)}
                />
            )}
        </>
    );
}
