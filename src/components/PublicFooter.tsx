import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Mail className="w-6 h-6 text-indigo-400" />
                            <span className="text-xl font-bold text-white">MailLedger</span>
                        </div>
                        <p className="text-sm">
                            Transforming emails into financial intelligence.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; 2026 MailLedger. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
