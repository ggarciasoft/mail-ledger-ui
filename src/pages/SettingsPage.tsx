import { Settings as SettingsIcon } from 'lucide-react';
import ProfileSection from '../components/ProfileSection';
import ApiKeysSection from '../components/ApiKeysSection';
import { EmailConnectionsSection } from '../components/EmailConnectionsSection';

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <SettingsIcon className="w-8 h-8 mr-3" />
                    Settings
                </h1>
                <p className="text-gray-600">Manage your profile, API keys, and email integrations</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                <ProfileSection />
                <ApiKeysSection />
                <EmailConnectionsSection />
            </div>
        </div>
    );
}
