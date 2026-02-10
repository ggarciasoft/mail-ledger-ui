import { Link } from 'react-router-dom';
import {
    Mail,
    Brain,
    Shield,
    Zap,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Database,
    Clock,
    Lock
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <PublicNavbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
                        Turn Your Emails Into
                        <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Financial Intelligence
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        MailLedger automatically extracts, classifies, and organizes financial data from your emails.
                        No more manual entry. No more missed transactions. Just clean, structured financial records.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/register"
                            className="group bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 text-lg font-semibold"
                        >
                            <span>Start Free Today</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="#features"
                            className="text-indigo-600 px-8 py-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-all text-lg font-semibold"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Hero Image/Illustration */}
                <div className="mt-16 relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                                <Mail className="w-12 h-12 text-indigo-600 mb-4" />
                                <h3 className="font-semibold text-slate-900 mb-2">Email Sync</h3>
                                <p className="text-sm text-slate-600">Connect your Email and sync financial emails automatically</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                                <h3 className="font-semibold text-slate-900 mb-2">AI Extraction</h3>
                                <p className="text-sm text-slate-600">AI extracts amounts, dates, merchants, and transaction details</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                                <Database className="w-12 h-12 text-blue-600 mb-4" />
                                <h3 className="font-semibold text-slate-900 mb-2">Structured Data</h3>
                                <p className="text-sm text-slate-600">Review and confirm to create immutable financial records</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Powerful Features for Financial Clarity
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Everything you need to transform email chaos into organized financial data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Automated Processing</h3>
                            <p className="text-slate-600">
                                Set it and forget it. MailLedger automatically syncs, classifies, and extracts data from your financial emails daily.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Brain className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Extraction</h3>
                            <p className="text-slate-600">
                                Advanced AI models extract amounts, currencies, dates, merchants, and transaction types with high accuracy.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">User Confirmation</h3>
                            <p className="text-slate-600">
                                You stay in control. Review AI-extracted data before it becomes a permanent financial record.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Rules Engine</h3>
                            <p className="text-slate-600">
                                Create custom rules to automatically filter, classify, or ignore emails based on sender, subject, or content.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Clock className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-Time Updates</h3>
                            <p className="text-slate-600">
                                Get instant notifications when jobs complete. No more polling or refreshing—updates happen in real-time.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group p-6 rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
                            <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lock className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure & Private</h3>
                            <p className="text-slate-600">
                                Read-only Email access, JWT authentication, encrypted tokens, and audit trails keep your data safe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            From email to financial record in four simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect Email</h3>
                                <p className="text-slate-600">
                                    Securely connect your Email account with read-only OAuth access.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <ArrowRight className="w-8 h-8 text-indigo-300" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Auto-Sync Emails</h3>
                                <p className="text-slate-600">
                                    MailLedger syncs financial emails and applies your custom rules.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <ArrowRight className="w-8 h-8 text-purple-300" />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Extraction</h3>
                                <p className="text-slate-600">
                                    AI extracts transaction details and presents them for your review.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <ArrowRight className="w-8 h-8 text-blue-300" />
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                    4
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Confirm & Store</h3>
                                <p className="text-slate-600">
                                    Review, confirm, and create immutable financial records.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Why Choose MailLedger?
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Stop wasting time manually tracking financial transactions from emails.
                                MailLedger automates the entire process while keeping you in control.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Save Hours Every Week</h4>
                                        <p className="text-slate-600">No more manual data entry or spreadsheet updates</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Never Miss a Transaction</h4>
                                        <p className="text-slate-600">Automatic daily syncs ensure complete financial records</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Clean, Structured Data</h4>
                                        <p className="text-slate-600">Export-ready financial data for accounting or analysis</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Full Control & Transparency</h4>
                                        <p className="text-slate-600">Review and confirm every transaction before it's saved</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100">
                            <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-600">Transaction</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Confirmed</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-900 mb-1">-$45.00 USD</div>
                                <div className="text-sm text-slate-600">Uber • Jan 13, 2026</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-600">Transaction</span>
                                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pending</span>
                                </div>
                                <div className="text-2xl font-bold text-slate-900 mb-1">-$120.50 USD</div>
                                <div className="text-sm text-slate-600">Amazon • Jan 12, 2026</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-600">Transaction</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Confirmed</span>
                                </div>
                                <div className="text-2xl font-bold text-green-600 mb-1">+$2,500.00 USD</div>
                                <div className="text-sm text-slate-600">Payroll Deposit • Jan 10, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Financial Workflow?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join MailLedger today and start turning your emails into actionable financial data.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
                    >
                        <span>Get Started Free</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="text-indigo-200 mt-4 text-sm">
                        No credit card required • Free forever
                    </p>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-8">
                        <Mail className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Stay Updated with MailLedger
                        </h2>
                        <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                            Get the latest updates, tips, and exclusive features delivered to your inbox.
                            Join our newsletter and never miss an update.
                        </p>
                    </div>

                    <form className="max-w-xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="group bg-white text-indigo-900 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center space-x-2"
                            >
                                <span>Subscribe</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <p className="text-indigo-300 text-sm mt-4 text-center">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>

                    {/* Social proof */}
                    <div className="mt-12 flex items-center justify-center space-x-8 text-indigo-200">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-sm">No spam, ever</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-sm">Weekly updates</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-sm">Exclusive tips</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
