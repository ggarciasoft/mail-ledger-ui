import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Mail, FileCheck, DollarSign, Settings, Play, LogOut, Filter, ListChecks, Workflow, CreditCard, Link as LinkIcon, Menu, X } from 'lucide-react';
import { useLogout } from '../hooks/use-auth';
import { useAuthStore } from '../store/auth-store';
import ActiveJobsPanel from './ActiveJobsPanel';

export default function AppLayout() {
    const location = useLocation();
    const logout = useLogout();
    const user = useAuthStore((state) => state.user);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Emails', href: '/emails', icon: Mail },
        { name: 'Extraction Candidates', href: '/extraction-candidates', icon: FileCheck },
        { name: 'Financial Records', href: '/financial-records', icon: DollarSign },
        { name: 'Processing', href: '/processing', icon: Play },
        { name: 'Jobs', href: '/jobs', icon: ListChecks },
        { name: 'Rules', href: '/rules', icon: Filter },
        { name: 'Workflow', href: '/workflow', icon: Workflow },
        { name: 'Subscription', href: '/subscription', icon: CreditCard },
        { name: 'Integrations', href: '/integrations', icon: LinkIcon },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        logout();
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile menu button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100"
            >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 bg-white border-r border-gray-200 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        MailLedger
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Financial Email Tracker</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={closeMobileMenu}
                                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${active ? 'text-blue-700' : 'text-gray-500'}`} />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto lg:ml-0">
                <Outlet />
            </div>

            {/* Active Jobs Panel - Hidden on mobile */}
            <div className="hidden xl:block">
                <ActiveJobsPanel />
            </div>
        </div>
    );
}
