import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmailProviderCard } from './EmailProviderCard';
import { useEmailConnections, useGetAuthUrl, useSyncEmails, useDisconnectProvider } from '../hooks/use-email-connections';
import { useSubscriptionUsage } from '../hooks/use-subscription';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../lib/jobs-api';
import { EmailProvider } from '../types/email-connection';
import { AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmailConnectionsSection() {
    const { data: connections, isLoading } = useEmailConnections();
    const { data: usage, isLoading: usageLoading } = useSubscriptionUsage();
    const getAuthUrlMutation = useGetAuthUrl();
    const syncMutation = useSyncEmails();
    const disconnectMutation = useDisconnectProvider();
    const [syncingProvider, setSyncingProvider] = useState<EmailProvider | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [callbackMessage, setCallbackMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Subscribe to all jobs cache (updated by SignalR) to detect failures
    const { data: allJobs } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => getJobs(),
        refetchInterval: 5000, // Fallback polling if SignalR fails
    });

    // Check for failed jobs and show notification
    useEffect(() => {
        if (allJobs && Array.isArray(allJobs)) {
            const recentFailedJob = allJobs.find(job =>
                job.status === 'Failed' &&
                job.jobType === 'EmailSync' &&
                // Only show if failed in the last 30 seconds
                job.completedAt && new Date(job.completedAt).getTime() > Date.now() - 30000
            );

            if (recentFailedJob && recentFailedJob.errorMessage) {
                setCallbackMessage({
                    type: 'error',
                    message: recentFailedJob.errorMessage
                });
                // Auto-clear after 10 seconds
                setTimeout(() => setCallbackMessage(null), 10000);
            }
        }
    }, [allJobs]);

    // Handle OAuth callback query parameters
    useEffect(() => {
        const gmailConnected = searchParams.get('gmail_connected');
        const error = searchParams.get('error');

        if (gmailConnected === 'true') {
            setCallbackMessage({
                type: 'success',
                message: 'Gmail account connected successfully!'
            });
            // Clear query params
            searchParams.delete('gmail_connected');
            setSearchParams(searchParams, { replace: true });
            // Auto-clear message after 5 seconds
            setTimeout(() => setCallbackMessage(null), 5000);
        } else if (error) {
            let errorMessage = 'Failed to connect Gmail account.';
            if (error === 'gmail_limit_reached') {
                errorMessage = 'Gmail account limit reached. Please upgrade your subscription to connect more accounts.';
            } else if (error === 'gmail_connection_failed') {
                errorMessage = 'Failed to connect Gmail account. Please try again.';
            }
            setCallbackMessage({
                type: 'error',
                message: errorMessage
            });
            // Clear query params
            searchParams.delete('error');
            setSearchParams(searchParams, { replace: true });
            // Auto-clear message after 5 seconds
            setTimeout(() => setCallbackMessage(null), 5000);
        }
    }, [searchParams, setSearchParams]);

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

    // Check if user can connect more email accounts
    const connectedCount = connections?.filter(c => c.isConnected).length || 0;
    const emailConnectionLimit = usage?.gmailAccountsLimit || 0;
    const canConnectMore = connectedCount < emailConnectionLimit;
    const isAtLimit = connectedCount >= emailConnectionLimit;


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Connections</h2>
                <p className="text-gray-600 mt-1">
                    Connect your email accounts to sync and process financial emails
                </p>
            </div>

            {/* OAuth Callback Messages */}
            {callbackMessage && (
                <div className={`flex items-center gap-2 p-4 border rounded-lg ${callbackMessage.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    {callbackMessage.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{callbackMessage.message}</p>
                </div>
            )}

            {/* Email Connection Limit Warning */}
            {!usageLoading && isAtLimit && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-medium text-yellow-900">Email Connection Limit Reached</p>
                        <p className="text-sm text-yellow-700 mt-1">
                            You've reached the maximum number of email connections for your plan ({emailConnectionLimit} {emailConnectionLimit === 1 ? 'connection' : 'connections'}).
                        </p>
                        <Link
                            to="/subscription"
                            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-yellow-900 hover:text-yellow-800 underline"
                        >
                            Upgrade your plan to connect more email accounts
                        </Link>
                    </div>
                </div>
            )}

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
                    disabled={!gmailConnection?.isConnected && !canConnectMore}
                />

                <EmailProviderCard
                    provider={EmailProvider.Outlook}
                    connection={outlookConnection}
                    onConnect={() => handleConnect(EmailProvider.Outlook)}
                    onSync={() => handleSync(EmailProvider.Outlook)}
                    onDisconnect={() => handleDisconnect(EmailProvider.Outlook)}
                    isSyncing={syncingProvider === EmailProvider.Outlook}
                    disabled={!outlookConnection?.isConnected && !canConnectMore}
                />
            </div>

            {syncMutation.isSuccess && syncMutation.data && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        {syncMutation.data.emailsSynced === 0 && syncMutation.data.emailsSkipped === 0
                            ? 'Sync Job Started'
                            : 'Sync Complete'}
                    </h3>
                    <div className="text-sm text-blue-800 space-y-1">
                        {syncMutation.data.emailsSynced === 0 && syncMutation.data.emailsSkipped === 0 ? (
                            <p>📧 Email sync is running in the background. You'll be notified when it completes.</p>
                        ) : (
                            <>
                                <p>✓ {syncMutation.data.emailsSynced} emails synced</p>
                                <p>↷ {syncMutation.data.emailsSkipped} emails skipped (already synced)</p>
                            </>
                        )}
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
