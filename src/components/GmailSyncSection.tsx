import { useGmailConnectionStatus, useTriggerGmailSync, useGmailSyncHistory } from '../hooks/use-settings';
import { Mail, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function GmailSyncSection() {
    const { data: status, isLoading: statusLoading } = useGmailConnectionStatus();
    const { data: history, isLoading: historyLoading } = useGmailSyncHistory();
    const syncMutation = useTriggerGmailSync();

    const handleSync = async () => {
        try {
            await syncMutation.mutateAsync();
        } catch (error) {
            console.error('Failed to trigger Gmail sync:', error);
        }
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

            {/* Manual Sync */}
            <div className="mb-6">
                <button
                    onClick={handleSync}
                    disabled={syncMutation.isPending || !status?.isConnected}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                    {syncMutation.isPending ? 'Syncing...' : 'Sync Now'}
                </button>
                <p className="mt-2 text-sm text-gray-500">
                    Manually trigger a Gmail sync to fetch new emails
                </p>
            </div>

            {/* Sync History */}
            <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">Sync History</h3>
                {historyLoading ? (
                    <p className="text-gray-500 text-sm">Loading history...</p>
                ) : !history || history.length === 0 ? (
                    <p className="text-gray-500 text-sm">No sync history yet</p>
                ) : (
                    <div className="space-y-2">
                        {history.slice(0, 5).map((sync) => (
                            <div
                                key={sync.id}
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg text-sm"
                            >
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(sync.status)}
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {sync.emailsProcessed} emails processed
                                        </p>
                                        <p className="text-xs text-gray-500">{formatDate(sync.startedAt)}</p>
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
