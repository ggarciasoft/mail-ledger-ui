import { useState } from 'react';
import { Mail, CheckCircle, XCircle, RefreshCw, Unplug, ExternalLink } from 'lucide-react';
import type { EmailConnection, EmailProvider } from '../types/email-connection';

interface EmailProviderCardProps {
    provider: EmailProvider;
    connection?: EmailConnection;
    onConnect: () => void;
    onSync: () => void;
    onDisconnect: () => void;
    isSyncing?: boolean;
}

const providerConfig = {
    Gmail: {
        name: 'Gmail',
        icon: '📧',
        color: 'bg-red-50 border-red-200',
        buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    Outlook: {
        name: 'Outlook',
        icon: '📨',
        color: 'bg-blue-50 border-blue-200',
        buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
};

export function EmailProviderCard({
    provider,
    connection,
    onConnect,
    onSync,
    onDisconnect,
    isSyncing = false
}: EmailProviderCardProps) {
    const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
    const config = providerConfig[provider];
    const isConnected = connection?.isConnected || false;

    const handleDisconnect = () => {
        onDisconnect();
        setShowDisconnectConfirm(false);
    };

    return (
        <div className={`border rounded-lg p-6 ${config.color}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-4xl">{config.icon}</span>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
                        {isConnected && connection && (
                            <p className="text-sm text-gray-600">{connection.email}</p>
                        )}
                    </div>
                </div>
                {isConnected ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                    <XCircle className="w-6 h-6 text-gray-400" />
                )}
            </div>

            {isConnected && connection && (
                <div className="mb-4 text-sm text-gray-600">
                    <p>
                        Connected: {new Date(connection.connectedAt).toLocaleDateString()}
                    </p>
                    {connection.lastSyncedAt && (
                        <p>
                            Last synced: {new Date(connection.lastSyncedAt).toLocaleString()}
                        </p>
                    )}
                </div>
            )}

            <div className="flex gap-2">
                {!isConnected ? (
                    <button
                        onClick={onConnect}
                        className={`flex items-center gap-2 px-4 py-2 text-white rounded-md ${config.buttonColor} transition-colors`}
                    >
                        <ExternalLink className="w-4 h-4" />
                        Connect {config.name}
                    </button>
                ) : (
                    <>
                        {!showDisconnectConfirm ? (
                            <>
                                <button
                                    onClick={onSync}
                                    disabled={isSyncing}
                                    className={`flex items-center gap-2 px-4 py-2 text-white rounded-md ${config.buttonColor} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                    {isSyncing ? 'Syncing...' : 'Sync Now'}
                                </button>
                                <button
                                    onClick={() => setShowDisconnectConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <Unplug className="w-4 h-4" />
                                    Disconnect
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 w-full">
                                <p className="text-sm text-gray-700 flex-1">Disconnect {config.name}?</p>
                                <button
                                    onClick={handleDisconnect}
                                    className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setShowDisconnectConfirm(false)}
                                    className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    No
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
