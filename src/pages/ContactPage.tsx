import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import { Mail, MessageSquare, MapPin, Send, CheckCircle } from 'lucide-react';
import { useSubmitContactMessage } from '../hooks/use-contact';
import type { ContactFormData } from '../types/contact';

const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    email: z.string().email('Invalid email address').max(100),
    subject: z.string().min(1, 'Subject is required').max(200),
    message: z.string().min(1, 'Message is required').max(2000),
});

export default function ContactPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const { mutate: submitMessage, isPending } = useSubmitContactMessage();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = (data: ContactFormData) => {
        submitMessage(data, {
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => setShowSuccess(false), 5000);
            },
        });
    };

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
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-between group">
                                        <span>How do I connect my Email?</span>
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

                        {showSuccess && (
                            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <p className="text-green-800 text-sm">Thank you for contacting us! We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        {...register('firstName')}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                    />
                                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register('lastName')}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                    />
                                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email')}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select
                                    id="subject"
                                    {...register('subject')}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Support Request">Support Request</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    {...register('message')}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                                ></textarea>
                                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                                <span>{isPending ? 'Sending...' : 'Send Message'}</span>
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
