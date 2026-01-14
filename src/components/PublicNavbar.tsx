import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';

export default function PublicNavbar() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Mail className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            MailLedger
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
