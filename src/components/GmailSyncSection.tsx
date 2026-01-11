import { useState } from 'react';
import { useGmailConnectionStatus, useTriggerGmailSync, useGmailSyncHistory, useConnectGmail } from '../hooks/use-settings';
import { useJob } from '../hooks/use-jobs';
import { Mail, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import JobStatusBadge from './JobStatusBadge';
import JobProgressBar from './JobProgressBar';

export default function GmailSyncSection() {
    const { data: status, isLoading: statusLoading } = useGmailConnectionStatus();
    const { data: history, isLoading: historyLoading } = useGmailSyncHistory();
    const syncMutation = useTriggerGmailSync();
    const connectMutation = useConnectGmail();
    const [maxEmailsInput, setMaxEmailsInput] = useState('50');
    const [currentJobId, setCurrentJobId] = useState<string | null>(null);

    // Track current job status
    const { data: currentJob } = useJob(currentJobId);

    const handleSync = async () => {
        const maxEmails = parseInt(maxEmailsInput);
        if (isNaN(maxEmails) || maxEmails < 1 || maxEmails > 100) return;

        try {
            const result = await syncMutation.mutateAsync(maxEmails);
            setCurrentJobId(result.jobId);
        } catch (error) {
            console.error('Failed to trigger Gmail sync:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty string or valid numbers
        if (value === '' || /^\d+$/.test(value)) {
            setMaxEmailsInput(value);
        }
    };

    const isValidInput = () => {
        if (maxEmailsInput === '') return false;
        const num = parseInt(maxEmailsInput);
        return !isNaN(num) && num >= 1 && num <= 100;
    };

    const getDisplayValue = () => {
        const num = parseInt(maxEmailsInput);
        return isNaN(num) ? 50 : num;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    const getStatusIcon = (syncStatus: string) => {
        switch (syncStatus) {
            case 'Completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'Failed':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'InProgress':
                return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Gmail Sync
            </h2>

            {/* Connection Status */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                {statusLoading ? (
                    <p className="text-gray-500">Loading connection status...</p>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Status:</span>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status?.isConnected
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {status?.isConnected ? 'Connected' : 'Not Connected'}
                            </span>
                        </div>
                        {status?.email && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Gmail Account:</span>
                                <span className="text-sm text-gray-900">{status.email}</span>
                            </div>
                        )}
                        {status?.lastSyncAt && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Last Sync:</span>
                                <span className="text-sm text-gray-900">{formatDate(status.lastSyncAt)}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Connect Gmail Button (when not connected) */}
            {!statusLoading && !status?.isConnected && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <button
                        onClick={() => connectMutation.mutate()}
                        disabled={connectMutation.isPending}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        {connectMutation.isPending ? 'Connecting...' : 'Connect Gmail Account'}
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                        Connect your Gmail account to start syncing emails
                    </p>
                </div>
            )}

            {/* Manual Sync (only when connected) */}
            {status?.isConnected && (
                <div className="mb-6">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Emails to Sync
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={maxEmailsInput}
                            onChange={handleInputChange}
                            placeholder="50"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="mt-1 text-xs text-gray-500">Enter a value between 1 and 100 (default: 50)</p>
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={syncMutation.isPending || !isValidInput()}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                        {syncMutation.isPending ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                            Manually trigger a Gmail sync to fetch new emails
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                            Syncing {getDisplayValue()} email{getDisplayValue() !== 1 ? 's' : ''} per operation
                        </p>
                    </div>

                    {/* Current Job Status */}
                    {currentJob && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Sync Job Status</span>
                                <JobStatusBadge status={currentJob.status} />
                            </div>
                            {(currentJob.status === 'Running' || currentJob.status === 'Pending') && (
                                <JobProgressBar
                                    progress={currentJob.progress}
                                    processedItems={currentJob.processedItems}
                                    totalItems={currentJob.totalItems}
                                    successCount={currentJob.successCount}
                                    failureCount={currentJob.failureCount}
                                />
                            )}
                            {currentJob.status === 'Completed' && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✓ Sync completed successfully! {currentJob.successCount} emails processed.
                                </p>
                            )}
                            {currentJob.status === 'Failed' && currentJob.errorMessage && (
                                <p className="text-sm text-red-600 mt-2">
                                    ✗ {currentJob.errorMessage}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Sync History */}
            <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Sync History</h3>
                {historyLoading ? (
                    <p className="text-gray-500 text-sm">Loading history...</p>
                ) : !history || history.history.length === 0 ? (
                    <p className="text-gray-500 text-sm">No sync history yet</p>
                ) : (
                    <div className="space-y-2">
                        {history.history.slice && history.history.slice(0, 5).map((sync) => (
                            <div
                                key={sync.syncedAt}
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg text-sm"
                            >
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(sync.status)}
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {sync.emailsProcessed} emails processed
                                        </p>
                                        <p className="text-xs text-gray-500">{formatDate(sync.syncedAt)}</p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${sync.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : sync.status === 'Failed'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}
                                >
                                    {sync.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
