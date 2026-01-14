import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import {
    Code,
    Key,
    Shield,
    Database,
    Server,
    FileJson,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApiPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-indigo-600/20 p-3 rounded-xl">
                            <Code className="w-10 h-10 text-indigo-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-6">MailLedger API</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Build powerful financial applications on top of our extraction engine.
                        Simple, RESTful, and secure.
                    </p>
                    <div className="mt-8">
                        <Link to="/docs" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center space-x-2">
                            <span>Read the Docs</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <Key className="w-8 h-8 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">API Key Auth</h3>
                        <p className="text-slate-600">
                            Secure access with scoped API keys. Manage and revoke keys instantly from your dashboard.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <FileJson className="w-8 h-8 text-purple-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">JSON Standard</h3>
                        <p className="text-slate-600">
                            Predictable, resource-oriented URLs, and JSON-encoded responses with standard HTTP codes.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <Shield className="w-8 h-8 text-blue-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Read-Only Access</h3>
                        <p className="text-slate-600">
                            Designed for data consumption. Extract your confirmed financial records without risk of modification.
                        </p>
                    </div>
                </div>

                {/* Example Response */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mb-20">
                    <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-slate-400 text-sm font-mono">GET /api/v1/financial-records</div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-indigo-300 font-mono text-sm leading-relaxed">
                            {`{
  "data": [
    {
      "id": "evt_123456789",
      "type": "payment",
      "amount": {
        "value": 45.00,
        "currency": "USD"
      },
      "merchant": "Uber Technologies",
      "date": "2026-01-14T10:30:00Z",
      "status": "confirmed",
      "metadata": {
        "source": "email",
        "email_id": "msg_987654321"
      }
    }
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "evt_123456789"
  }
}`}
                        </pre>
                    </div>
                </div>

                {/* Use Cases */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What can you build?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                                <Database className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Custom Dashboards</h3>
                                <p className="text-slate-600">
                                    Pull your financial data into your own custom analytics dashboards or BI tools.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                                <Server className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Accounting Integrations</h3>
                                <p className="text-slate-600">
                                    Sync your email-extracted expenses directly with your accounting software via API.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <PublicFooter />
        </div>
    );
}
