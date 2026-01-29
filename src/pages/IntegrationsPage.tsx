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
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <Link className="w-8 h-8 mr-3" />
                    Integrations
                </h1>
                <p className="text-gray-600">
                    Manage API keys, webhooks, and email connections
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                    ${isActive
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <Icon
                                    className={`
                                        -ml-0.5 mr-2 h-5 w-5
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
            <div className="mt-6">
                {activeTab === 'api-keys' && <ApiKeysSection />}
                {activeTab === 'webhooks' && <WebhookSection />}
                {activeTab === 'email-connections' && <EmailConnectionsSection />}
            </div>
        </div>
    );
}
