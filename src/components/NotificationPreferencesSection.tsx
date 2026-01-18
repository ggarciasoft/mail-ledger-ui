import { Bell, Mail, Target, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    useNotificationPreferences,
    useUpdateNotificationPreferences,
} from '../hooks/use-notification-preferences';
import type { NotificationPreferences } from '../types/notification-preferences';

export default function NotificationPreferencesSection() {
    const { data: preferences, isLoading } = useNotificationPreferences();
    const updateMutation = useUpdateNotificationPreferences();
    const [localPreferences, setLocalPreferences] = useState<NotificationPreferences | undefined>(preferences);

    // Update local state when data loads
    useEffect(() => {
        if (preferences) {
            setLocalPreferences(preferences);
        }
    }, [preferences]);

    const handleToggle = async (field: keyof NotificationPreferences) => {
        if (!localPreferences) return;

        const updated = {
            ...localPreferences,
            [field]: !localPreferences[field],
        };

        setLocalPreferences(updated);
        await updateMutation.mutateAsync(updated);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!localPreferences) return null;

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                    <Bell className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Email Notifications
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Control which email notifications you receive
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {/* Master Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-600 mr-3" />
                        <div>
                            <h3 className="font-medium text-gray-900">
                                Enable Email Notifications
                            </h3>
                            <p className="text-sm text-gray-600">
                                Master switch for all email notifications
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggle('emailNotificationsEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPreferences.emailNotificationsEnabled
                            ? 'bg-indigo-600'
                            : 'bg-gray-300'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPreferences.emailNotificationsEnabled
                                ? 'translate-x-6'
                                : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Individual Toggles */}
                <div
                    className={`space-y-3 ${!localPreferences.emailNotificationsEnabled
                        ? 'opacity-50 pointer-events-none'
                        : ''
                        }`}
                >
                    {/* Email Sync */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-green-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-900">Email Sync Complete</h4>
                                <p className="text-sm text-gray-600">
                                    Notify when email synchronization finishes
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('notifyOnEmailSync')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPreferences.notifyOnEmailSync
                                ? 'bg-green-600'
                                : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPreferences.notifyOnEmailSync
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Classification */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Target className="w-5 h-5 text-blue-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-900">
                                    Classification Complete
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Notify when email classification finishes
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('notifyOnClassification')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPreferences.notifyOnClassification
                                ? 'bg-blue-600'
                                : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPreferences.notifyOnClassification
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Extraction */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5 text-orange-600 mr-3" />
                            <div>
                                <h4 className="font-medium text-gray-900">
                                    Extraction Complete
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Notify when financial data extraction finishes
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('notifyOnExtraction')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localPreferences.notifyOnExtraction
                                ? 'bg-orange-600'
                                : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localPreferences.notifyOnExtraction
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {updateMutation.isError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">
                            Failed to update preferences. Please try again.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
