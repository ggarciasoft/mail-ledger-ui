import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Start for free, upgrade as you grow. No hidden fees.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Free Plan */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Free</h3>
                            <div className="flex items-baseline mb-2">
                                <span className="text-4xl font-bold text-slate-900">$0</span>
                                <span className="text-slate-600">/month</span>
                            </div>
                            <p className="text-slate-600 text-sm">Perfect for individuals just getting started.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Connect 1 Gmail account</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">50 transactions / month</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Basic AI Extraction</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">7-day history</span>
                            </li>
                            <li className="flex items-start opacity-50">
                                <X className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-500 text-sm">API Access</span>
                            </li>
                        </ul>
                        <Link to="/register" className="block w-full text-center bg-indigo-50 text-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 flex flex-col transform md:-translate-y-4 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
                            <div className="flex items-baseline mb-2">
                                <span className="text-4xl font-bold text-white">$12</span>
                                <span className="text-slate-400">/month</span>
                            </div>
                            <p className="text-slate-400 text-sm">For power users and freelancers.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">Connect 3 Gmail accounts</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">Unlimited transactions</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">Advanced AI Analysis</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">Unlimited history</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">API Access</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">Export to CSV/JSON</span>
                            </li>
                        </ul>
                        <Link to="/register?plan=pro" className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
                            Start Pro Trial
                        </Link>
                    </div>

                    {/* Business Plan */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Business</h3>
                            <div className="flex items-baseline mb-2">
                                <span className="text-4xl font-bold text-slate-900">$49</span>
                                <span className="text-slate-600">/month</span>
                            </div>
                            <p className="text-slate-600 text-sm">For teams and organizations.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Unlimited Gmail accounts</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Custom AI Logic Rules</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Priority Support</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">Dedicated API Limits</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-slate-700 text-sm">SSO / SAML</span>
                            </li>
                        </ul>
                        <Link to="/contact" className="block w-full text-center bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors">
                            Contact Sales
                        </Link>
                    </div>

                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left mt-8">
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Can I cancel anytime?</h4>
                            <p className="text-slate-600 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Is my payment info secure?</h4>
                            <p className="text-slate-600 text-sm">We use Stripe for payment processing. We never store your credit card information on our servers.</p>
                        </div>
                    </div>
                </div>

            </div>

            <PublicFooter />
        </div>
    );
}
