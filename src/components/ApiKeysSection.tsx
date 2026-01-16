import { useState } from 'react';
import { useApiKeys, useCreateApiKey, useDeleteApiKey } from '../hooks/use-settings';
import { useSubscriptionUsage } from '../hooks/use-subscription';
import { Key, Plus, Trash2, Copy, Check, Calendar, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALLOWED_SCOPES = [
    { value: 'read:transactions', label: 'Read Transactions', description: 'View financial records' },
    { value: 'read:rules', label: 'Read Rules', description: 'View email filtering rules' },
    { value: 'write:rules', label: 'Write Rules', description: 'Create/modify rules' },
    { value: 'read:users', label: 'Read Users', description: 'View user information' },
    { value: 'write:users', label: 'Write Users', description: 'Modify user information' },
];

export default function ApiKeysSection() {
    const { data: apiKeys, isLoading } = useApiKeys();
    const { data: usage, isLoading: usageLoading } = useSubscriptionUsage();
    const createMutation = useCreateApiKey();
    const deleteMutation = useDeleteApiKey();

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [keyName, setKeyName] = useState('');
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [expiresAt, setExpiresAt] = useState<string>('');
    const [hasExpiration, setHasExpiration] = useState(false);
    const [newKey, setNewKey] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState(false);

    const handleCreate = async () => {
        if (!keyName.trim() || selectedScopes.length === 0) return;

        try {
            const result = await createMutation.mutateAsync({
                name: keyName,
                scopes: selectedScopes,
                expiresAt: hasExpiration && expiresAt ? expiresAt : null,
            });
            setNewKey(result.apiKey);
            setKeyName('');
            setSelectedScopes([]);
            setExpiresAt('');
            setHasExpiration(false);
            setShowCreateDialog(false);
        } catch (error) {
            console.error('Failed to create API key:', error);
        }
    };

    const toggleScope = (scopeValue: string) => {
        setSelectedScopes(prev =>
            prev.includes(scopeValue)
                ? prev.filter(s => s !== scopeValue)
                : [...prev, scopeValue]
        );
    };

    const getScopeLabel = (scopeValue: string) => {
        const scope = ALLOWED_SCOPES.find(s => s.value === scopeValue);
        return scope ? scope.label : scopeValue;
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
        } catch (error) {
            console.error('Failed to delete API key:', error);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Key className="w-5 h-5 mr-2 text-blue-600" />
                        API Keys
                    </h2>
                    {!usageLoading && usage && (
                        <p className="text-sm text-gray-600 mt-1">
                            {usage.apiKeysCreated} of {usage.apiKeysLimit === Number.MAX_SAFE_INTEGER ? 'unlimited' : usage.apiKeysLimit} keys used
                        </p>
                    )}
                </div>
                <button
                    onClick={() => setShowCreateDialog(true)}
                    disabled={!usageLoading && usage ? usage.apiKeysCreated >= usage.apiKeysLimit : false}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {!usageLoading && usage && usage.apiKeysCreated >= usage.apiKeysLimit ? (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            Limit Reached
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Key
                        </>
                    )}
                </button>
            </div>

            {/* Limit Warning */}
            {!usageLoading && usage && usage.apiKeysCreated >= usage.apiKeysLimit && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-medium text-yellow-900">API Key Limit Reached</p>
                        <p className="text-sm text-yellow-700 mt-1">
                            You've reached the maximum number of API keys for your plan ({usage.apiKeysLimit} {usage.apiKeysLimit === 1 ? 'key' : 'keys'}).
                            {usage.apiKeysLimit === 0 && (
                                <span> API keys are not available on the Free plan.</span>
                            )}
                        </p>
                        <Link
                            to="/subscription"
                            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-yellow-900 hover:text-yellow-800 underline"
                        >
                            Upgrade your plan to create more API keys
                        </Link>
                    </div>
                </div>
            )}

            {/* New Key Display */}
            {newKey && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-2">
                        API Key Created! Copy it now - it won't be shown again.
                    </p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-white border border-green-300 rounded font-mono text-sm">
                            {newKey}
                        </code>
                        <button
                            onClick={() => copyToClipboard(newKey)}
                            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* API Keys List */}
            {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading API keys...</div>
            ) : !apiKeys || apiKeys.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No API keys yet. Create one to get started.
                </div>
            ) : (
                <div className="space-y-3">
                    {apiKeys.map((key) => (
                        <div
                            key={key.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{key.name}</p>
                                <p className="text-sm text-gray-500 font-mono">{key.maskedKey}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {key.scopes.map(scope => (
                                        <span
                                            key={scope}
                                            className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                                        >
                                            {getScopeLabel(scope)}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Created: {formatDate(key.createdAt)}
                                    {key.lastUsedAt && ` • Last used: ${formatDate(key.lastUsedAt)}`}
                                    {key.expiresAt && (
                                        <span className={`ml-2 ${new Date(key.expiresAt) < new Date() ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                            • {new Date(key.expiresAt) < new Date() ? 'Expired' : 'Expires'}: {formatDate(key.expiresAt)}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(key.id)}
                                disabled={deleteMutation.isPending}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Dialog */}
            {showCreateDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create API Key</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Name
                            </label>
                            <input
                                type="text"
                                value={keyName}
                                onChange={(e) => setKeyName(e.target.value)}
                                placeholder="e.g., Production Server"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Scopes (Permissions)
                            </label>
                            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3">
                                {ALLOWED_SCOPES.map(scope => (
                                    <label
                                        key={scope.value}
                                        className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedScopes.includes(scope.value)}
                                            onChange={() => toggleScope(scope.value)}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-gray-900">{scope.label}</div>
                                            <div className="text-xs text-gray-500">{scope.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {selectedScopes.length === 0 && (
                                <p className="text-xs text-red-600 mt-1">Please select at least one scope</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hasExpiration}
                                    onChange={(e) => setHasExpiration(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Set expiration date</span>
                            </label>
                            {hasExpiration && (
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Calendar className="w-4 h-4 inline mr-1" />
                                        Expires At
                                    </label>
                                    <input
                                        type="date"
                                        value={expiresAt}
                                        onChange={(e) => setExpiresAt(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateDialog(false);
                                    setKeyName('');
                                    setSelectedScopes([]);
                                    setExpiresAt('');
                                    setHasExpiration(false);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!keyName.trim() || selectedScopes.length === 0 || createMutation.isPending}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                            >
                                {createMutation.isPending ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
