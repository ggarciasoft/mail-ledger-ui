import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import {
    Zap,
    Brain,
    Shield,
    TrendingUp,
    Clock,
    Search,
    Filter,
    Download
} from 'lucide-react';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Powerful Features</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Everything you need to automate your financial tracking and gain clarity on your spending.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Core Features */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Auto-Sync</h3>
                            <p className="text-slate-600">
                                Connect your Gmail account once and let us handle the rest. We automatically scan for new financial emails daily.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Brain className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Extraction</h3>
                            <p className="text-slate-600">
                                Our advanced AI accurately identifies merchants, amounts, dates, and currencies from complex email formats.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Human Review</h3>
                            <p className="text-slate-600">
                                You permit every entry. Review AI suggestions and confirm them before they become permanent records.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Advanced Tools */}
                <div className="py-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Advanced Tools</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 md:order-1">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Rules Engine</h3>
                            <p className="text-lg text-slate-600 mb-6">
                                Create custom rules to filter out noise. Automatically ignore marketing emails or flag specific transactions for review based on sender, subject, or keywords.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2 text-slate-700">
                                    <Filter className="w-5 h-5 text-indigo-500" />
                                    <span>Filter by sender, subject, or body</span>
                                </li>
                                <li className="flex items-center space-x-2 text-slate-700">
                                    <Clock className="w-5 h-5 text-indigo-500" />
                                    <span>Set automatic actions</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-50 p-8 rounded-2xl order-1 md:order-2 flex items-center justify-center">
                            <Filter className="w-32 h-32 text-indigo-200" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="bg-purple-50 p-8 rounded-2xl flex items-center justify-center">
                            <TrendingUp className="w-32 h-32 text-purple-200" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Financial Dashboard</h3>
                            <p className="text-lg text-slate-600 mb-6">
                                Visualise your spending trends over time. See where your money is going with intuitive charts and category breakdowns.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2 text-slate-700">
                                    <Search className="w-5 h-5 text-purple-500" />
                                    <span>Advanced search and filtering</span>
                                </li>
                                <li className="flex items-center space-x-2 text-slate-700">
                                    <Download className="w-5 h-5 text-purple-500" />
                                    <span>Export to CSV or JSON</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <PublicFooter />
        </div>
    );
}
