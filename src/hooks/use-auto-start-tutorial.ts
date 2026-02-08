import { useEffect } from 'react';
import { useTutorial } from '../contexts/TutorialContext';
import { getTutorialSteps } from '../config/tutorials';

/**
 * Hook to auto-start tutorial on first visit to a page
 */
export function useAutoStartTutorial(page: string) {
    const { hasCompletedTutorial, startTutorial } = useTutorial();

    useEffect(() => {
        // Only auto-start if tutorial hasn't been completed
        if (!hasCompletedTutorial(page)) {
            const steps = getTutorialSteps(page);
            if (steps) {
                // Small delay to ensure DOM elements are rendered
                const timer = setTimeout(() => {
                    startTutorial(page, steps);
                }, 500);

                return () => clearTimeout(timer);
            }
        }
    }, [page, hasCompletedTutorial, startTutorial]);
}
