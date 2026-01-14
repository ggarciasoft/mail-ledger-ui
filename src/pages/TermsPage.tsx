import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 mb-6">
                            Last updated: January 14, 2026
                        </p>

                        <p>
                            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the MailLedger website and service operated by MailLedger ("us", "we", or "our").
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-6">
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Accounts</h2>
                        <p className="mb-6">
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Intellectual Property</h2>
                        <p className="mb-6">
                            The Service and its original content, features and functionality are and will remain the exclusive property of MailLedger and its licensors.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Termination</h2>
                        <p className="mb-6">
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Limitation of Liability</h2>
                        <p className="mb-6">
                            In no event shall MailLedger, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                        </p>
                    </div>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
