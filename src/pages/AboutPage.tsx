import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Mail, Target, Users, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">About MailLedger</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We're on a mission to simplify financial data management by turning the chaos of email inboxes into structured, actionable intelligence.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <div className="bg-indigo-100 p-3 rounded-xl w-fit mb-6">
                            <Target className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-slate-600 mb-4">
                            Financial data shouldn't be trapped in your inbox. Every receipt, invoice, and payment notification contains valuable data that is often lost or requires tedious manual entry to track.
                        </p>
                        <p className="text-lg text-slate-600">
                            MailLedger exists to bridge the gap between your communication and your accounting. We believe in automation that keeps you in control—giving you the speed of AI with the accuracy of human review.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                        <div className="aspect-video bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl flex items-center justify-center">
                            <Mail className="w-20 h-20 text-indigo-300" />
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">User-Centric</h3>
                            <p className="text-slate-600">
                                We design for users, not just data. Your experience, privacy, and control come first in every decision we make.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Accuracy First</h3>
                            <p className="text-slate-600">
                                Financial data must be precise. We prioritize accuracy over speed and provide tools for verification.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Vision</h3>
                            <p className="text-slate-600">
                                We're building for a connected world, supporting multiple currencies and international transaction formats.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
