import { HelpCircle } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';
import { getTutorialSteps, hasTutorial } from '../config/tutorials';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function FloatingHelpButton() {
    const location = useLocation();
    const { startTutorial, hasCompletedTutorial } = useTutorial();
    const [currentPage, setCurrentPage] = useState('');
    const [showPulse, setShowPulse] = useState(false);

    // Determine current page from route
    useEffect(() => {
        const path = location.pathname;
        let page = '';

        if (path === '/dashboard' || path === '/') {
            page = 'dashboard';
        } else if (path === '/emails') {
            page = 'emails';
        } else if (path === '/extraction-candidates') {
            page = 'extraction-candidates';
        } else if (path === '/financial-records') {
            page = 'financial-records';
        } else if (path === '/processing') {
            page = 'processing';
        } else if (path === '/rules') {
            page = 'rules';
        } else if (path === '/workflow') {
            page = 'workflow';
        } else if (path === '/settings') {
            page = 'settings';
        }

        setCurrentPage(page);

        // Show pulse animation if tutorial hasn't been completed
        if (page && hasTutorial(page) && !hasCompletedTutorial(page)) {
            setShowPulse(true);
        } else {
            setShowPulse(false);
        }
    }, [location.pathname, hasCompletedTutorial]);

    // Don't show button if current page doesn't have a tutorial
    if (!currentPage || !hasTutorial(currentPage)) {
        return null;
    }

    const handleClick = () => {
        const steps = getTutorialSteps(currentPage);
        if (steps) {
            startTutorial(currentPage, steps);
            setShowPulse(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showPulse ? 'animate-pulse' : ''
                }`}
            aria-label="Start tutorial"
            title="Start tutorial"
        >
            <HelpCircle className="w-6 h-6" />

            {/* Pulse ring animation for first-time users */}
            {showPulse && (
                <span className="absolute inset-0 rounded-full bg-blue-600 opacity-75 animate-ping"></span>
            )}
        </button>
    );
}
