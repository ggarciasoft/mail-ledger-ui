import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useWebhookEndpoints } from '../hooks/use-webhooks';
import WebhookCard from './WebhookCard';
import WebhookForm from './WebhookForm';
import EmptyState from './EmptyState';

export default function WebhookSection() {
    const { data: webhooks, isLoading } = useWebhookEndpoints();
    const [showForm, setShowForm] = useState(false);
    const [editingWebhook, setEditingWebhook] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-20 bg-gray-200 rounded"></div>
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingWebhook(null);
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Webhooks</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Receive real-time notifications when candidates are confirmed
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Webhook
                    </button>
                </div>
            </div>

            <div className="p-6">
                {!webhooks || webhooks.length === 0 ? (
                    <EmptyState
                        icon={Plus}
                        title="No webhooks configured"
                        description="Create a webhook to receive real-time notifications when extraction candidates are confirmed."
                        action={{
                            label: 'Add Your First Webhook',
                            onClick: () => setShowForm(true),
                        }}
                    />
                ) : (
                    <div className="space-y-4">
                        {webhooks.map((webhook) => (
                            <WebhookCard
                                key={webhook.id}
                                webhook={webhook}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showForm && (
                <WebhookForm
                    webhookId={editingWebhook}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
