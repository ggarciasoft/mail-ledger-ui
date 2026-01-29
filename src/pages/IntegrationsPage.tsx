import { useState } from 'react';
import { Link, Key, Webhook, Mail } from 'lucide-react';
import ApiKeysSection from '../components/ApiKeysSection';
import { EmailConnectionsSection } from '../components/EmailConnectionsSection';
import WebhookSection from '../components/WebhookSection';

type TabType = 'api-keys' | 'webhooks' | 'email-connections';

export default function IntegrationsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('api-keys');

    const tabs = [
        { id: 'api-keys' as TabType, name: 'API Keys', icon: Key },
        { id: 'webhooks' as TabType, name: 'Webhooks', icon: Webhook },
        { id: 'email-connections' as TabType, name: 'Email Connections', icon: Mail },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 lg:mb-8 pt-12 lg:pt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <Link className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Integrations
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    Manage API keys, webhooks, and email connections
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    group inline-flex items-center py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap
                                    ${isActive
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <Icon
                                    className={`
                                        -ml-0.5 mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5
                                        ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                                    `}
                                />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-4 sm:mt-6">
                {activeTab === 'api-keys' && <ApiKeysSection />}
                {activeTab === 'webhooks' && <WebhookSection />}
                {activeTab === 'email-connections' && <EmailConnectionsSection />}
            </div>
        </div>
    );
}
