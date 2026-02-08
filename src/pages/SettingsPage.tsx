import { Settings as SettingsIcon } from 'lucide-react';
import ProfileSection from '../components/ProfileSection';
import NotificationPreferencesSection from '../components/NotificationPreferencesSection';
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

export default function SettingsPage() {
    // Auto-start tutorial on first visit
    useAutoStartTutorial('settings');

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 lg:mb-8 pt-12 lg:pt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Settings
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Manage your profile and preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-4 sm:space-y-6">
                <div className="profile-section">
                    <ProfileSection />
                </div>
                <div className="notification-preferences-section">
                    <NotificationPreferencesSection />
                </div>
            </div>
        </div>
    );
}
