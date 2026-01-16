import { useState } from 'react';
import { EmailProviderCard } from './EmailProviderCard';
import { useEmailConnections, useGetAuthUrl, useSyncEmails, useDisconnectProvider } from '../hooks/use-email-connections';
import { EmailProvider } from '../types/email-connection';
import { AlertCircle } from 'lucide-react';

export function EmailConnectionsSection() {
    const { data: connections, isLoading } = useEmailConnections();
    const getAuthUrlMutation = useGetAuthUrl();
    const syncMutation = useSyncEmails();
    const disconnectMutation = useDisconnectProvider();
    const [syncingProvider, setSyncingProvider] = useState<EmailProvider | null>(null);

    const handleConnect = async (provider: EmailProvider) => {
        try {
            const result = await getAuthUrlMutation.mutateAsync(provider);
            // Redirect to OAuth URL
            window.location.href = result.authorizationUrl;
        } catch (error) {
            console.error('Failed to get auth URL:', error);
        }
    };

    const handleSync = async (provider: EmailProvider) => {
        setSyncingProvider(provider);
        try {
            await syncMutation.mutateAsync({ provider });
        } catch (error) {
            console.error('Failed to sync emails:', error);
        } finally {
            setSyncingProvider(null);
        }
    };

    const handleDisconnect = async (provider: EmailProvider) => {
        try {
            await disconnectMutation.mutateAsync(provider);
        } catch (error) {
            console.error('Failed to disconnect provider:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Email Connections</h2>
                <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-gray-200 rounded-lg"></div>
                    <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    const gmailConnection = connections?.find(c => c.provider === EmailProvider.Gmail);
    const outlookConnection = connections?.find(c => c.provider === EmailProvider.Outlook);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Connections</h2>
                <p className="text-gray-600 mt-1">
                    Connect your email accounts to sync and process financial emails
                </p>
            </div>

            {syncMutation.isError && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">
                        {syncMutation.error instanceof Error ? syncMutation.error.message : 'Failed to sync emails'}
                    </p>
                </div>
            )}

            {disconnectMutation.isError && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">
                        {disconnectMutation.error instanceof Error ? disconnectMutation.error.message : 'Failed to disconnect provider'}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmailProviderCard
                    provider={EmailProvider.Gmail}
                    connection={gmailConnection}
                    onConnect={() => handleConnect(EmailProvider.Gmail)}
                    onSync={() => handleSync(EmailProvider.Gmail)}
                    onDisconnect={() => handleDisconnect(EmailProvider.Gmail)}
                    isSyncing={syncingProvider === EmailProvider.Gmail}
                />

                <EmailProviderCard
                    provider={EmailProvider.Outlook}
                    connection={outlookConnection}
                    onConnect={() => handleConnect(EmailProvider.Outlook)}
                    onSync={() => handleSync(EmailProvider.Outlook)}
                    onDisconnect={() => handleDisconnect(EmailProvider.Outlook)}
                    isSyncing={syncingProvider === EmailProvider.Outlook}
                />
            </div>

            {syncMutation.isSuccess && syncMutation.data && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Sync Complete</h3>
                    <div className="text-sm text-green-800 space-y-1">
                        <p>✓ {syncMutation.data.emailsSynced} emails synced</p>
                        <p>↷ {syncMutation.data.emailsSkipped} emails skipped (already synced)</p>
                        {syncMutation.data.errors.length > 0 && (
                            <div className="mt-2">
                                <p className="font-semibold">Errors:</p>
                                <ul className="list-disc list-inside">
                                    {syncMutation.data.errors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
