import { Shield, Lock, Database, Key } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="bg-indigo-100 p-3 rounded-lg">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Security at MailLedger</h1>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 mb-8">
                            We use bank-level security measures to ensure your financial data remains private, secure, and under your control.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <Lock className="w-8 h-8 text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Encryption in Transit & Rest</h3>
                                <p className="text-slate-600">
                                    All data is encrypted using TLS 1.3 during transmission and AES-256 encryption at rest.
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <Key className="w-8 h-8 text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-2">OAuth Authentication</h3>
                                <p className="text-slate-600">
                                    We use OAuth 2.0 to access your data without ever storing your email passwords.
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <Database className="w-8 h-8 text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Strict Data Isolation</h3>
                                <p className="text-slate-600">
                                    Your data is logically isolated and access-controlled. We practice strict least-privilege access.
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <Shield className="w-8 h-8 text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Regular Audits</h3>
                                <p className="text-slate-600">
                                    We conduct regular security audits and penetration testing to identify and fix vulnerabilities.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Responsible Disclosure</h2>
                        <p className="mb-6">
                            If you believe you have found a security vulnerability in MailLedger, please contact us at support@mailledger.com. We appreciate your help in keeping our service secure.
                        </p>
                    </div>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
