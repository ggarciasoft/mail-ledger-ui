import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 mb-6">
                            Last updated: January 14, 2026
                        </p>

                        <p>
                            At MailLedger, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our service.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                            <li>Account information (name, email address)</li>
                            <li>Financial data extracted from emails (only as authorized by you)</li>
                            <li>Usage data and analytical information</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                            <li>Provide, operate, and maintain our service</li>
                            <li>Improve, personalize, and expand our service</li>
                            <li>Understand and analyze how you use our service</li>
                            <li>Process your transactions and manage your orders</li>
                            <li>Send you emails, including confirmation, invoices, technical notices, updates, security alerts, and support and administrative messages</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Data Security</h2>
                        <p className="mb-6">
                            We implement appropriate technical and organizational security measures to protect the security of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Third-Party Services</h2>
                        <p className="mb-6">
                            We may use third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                        </p>

                        <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@mailledger.com.
                        </p>
                    </div>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
