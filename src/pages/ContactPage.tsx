import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have questions about MailLedger? We're here to help.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-indigo-100 p-3 rounded-lg">
                                    <Mail className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                                    <p className="text-slate-600 mb-2">For general inquiries and support:</p>
                                    <a href="mailto:support@mailledger.com" className="text-indigo-600 hover:text-indigo-700 font-medium">support@mailledger.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <MessageSquare className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Live Chat</h3>
                                    <p className="text-slate-600 mb-2">Available Mon-Fri, 9am - 5pm EST:</p>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">Start a chat</button>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                                    <p className="text-slate-600">
                                        123 Innovation Drive<br />
                                        Tech City, TC 90210<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-between group">
                                        <span>How do I connect my Gmail?</span>
                                        <span className="text-slate-400 group-hover:text-indigo-600">→</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-between group">
                                        <span>Is my data secure?</span>
                                        <span className="text-slate-400 group-hover:text-indigo-600">→</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-between group">
                                        <span>Can I export to QuickBooks?</span>
                                        <span className="text-slate-400 group-hover:text-indigo-600">→</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" id="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" id="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                    <option>General Inquiry</option>
                                    <option>Support Request</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2">
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* PublicFooter */}
            <PublicFooter />
        </div>
    );
}
