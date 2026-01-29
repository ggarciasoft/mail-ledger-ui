import { useState } from 'react';
import { X, Copy, Check, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
    useCreateWebhookEndpoint,
    useUpdateWebhookEndpoint,
    useWebhookEndpoints,
} from '../hooks/use-webhooks';
import { WebhookEventType } from '../types/webhook';

interface WebhookFormProps {
    webhookId?: string | null;
    onClose: () => void;
}

interface FormData {
    url: string;
    events: string[];
}

export default function WebhookForm({ webhookId, onClose }: WebhookFormProps) {
    const [secretKey, setSecretKey] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const { data: webhooks } = useWebhookEndpoints();
    const createWebhook = useCreateWebhookEndpoint();
    const updateWebhook = useUpdateWebhookEndpoint();

    const existingWebhook = webhookId
        ? webhooks?.find((w) => w.id === webhookId)
        : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            url: existingWebhook?.url || '',
            events: existingWebhook?.events || [WebhookEventType.CandidateConfirmed],
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            if (webhookId) {
                await updateWebhook.mutateAsync({
                    id: webhookId,
                    request: data,
                });
                onClose();
            } else {
                const result = await createWebhook.mutateAsync(data);
                if (result.secretKey) {
                    setSecretKey(result.secretKey);
                }
            }
        } catch (error) {
            console.error('Failed to save webhook:', error);
        }
    };

    const handleCopySecret = () => {
        if (secretKey) {
            navigator.clipboard.writeText(secretKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClose = () => {
        if (secretKey) {
            if (
                confirm(
                    'Are you sure? The secret key will not be shown again. Make sure you have copied it.'
                )
            ) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {webhookId ? 'Edit Webhook' : 'Create Webhook'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {secretKey && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="font-medium text-yellow-900 mb-2">
                                        Save Your Secret Key
                                    </h3>
                                    <p className="text-sm text-yellow-800 mb-3">
                                        This is the only time you'll see this secret key. Copy it now
                                        and store it securely. You'll need it to verify webhook
                                        signatures.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-white px-3 py-2 rounded border border-yellow-300 text-sm font-mono break-all">
                                            {secretKey}
                                        </code>
                                        <button
                                            type="button"
                                            onClick={handleCopySecret}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors flex items-center gap-2"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="url"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Webhook URL
                        </label>
                        <input
                            {...register('url', {
                                required: 'URL is required',
                                pattern: {
                                    value: /^https?:\/\/.+/,
                                    message: 'Must be a valid HTTP or HTTPS URL',
                                },
                            })}
                            type="url"
                            id="url"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/webhook"
                            disabled={!!secretKey}
                        />
                        {errors.url && (
                            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Events to Subscribe
                        </label>
                        <div className="space-y-2">
                            {Object.values(WebhookEventType).map((eventType) => (
                                <label
                                    key={eventType}
                                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        {...register('events', {
                                            required: 'Select at least one event',
                                        })}
                                        type="checkbox"
                                        value={eventType}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        disabled={!!secretKey}
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{eventType}</div>
                                        <div className="text-sm text-gray-600">
                                            {eventType === WebhookEventType.CandidateConfirmed
                                                ? 'Triggered when a single extraction candidate is confirmed'
                                                : 'Triggered when multiple extraction candidates are confirmed in bulk'}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.events && (
                            <p className="mt-1 text-sm text-red-600">{errors.events.message}</p>
                        )}
                    </div>

                    {!secretKey && (
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createWebhook.isPending || updateWebhook.isPending}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createWebhook.isPending || updateWebhook.isPending
                                    ? 'Saving...'
                                    : webhookId
                                        ? 'Update Webhook'
                                        : 'Create Webhook'}
                            </button>
                        </div>
                    )}

                    {secretKey && (
                        <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
