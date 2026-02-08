import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Step } from 'react-joyride';

interface TutorialContextType {
    run: boolean;
    steps: Step[];
    currentPage: string;
    startTutorial: (page: string, steps: Step[]) => void;
    stopTutorial: () => void;
    resetTutorial: (page: string) => void;
    hasCompletedTutorial: (page: string) => boolean;
    markTutorialComplete: (page: string) => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

const STORAGE_KEY = 'mailledger_completed_tutorials';

export function TutorialProvider({ children }: { children: React.ReactNode }) {
    const [run, setRun] = useState(false);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentPage, setCurrentPage] = useState('');
    const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(() => {
        // Load completed tutorials from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    });

    // Save completed tutorials to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedTutorials)));
    }, [completedTutorials]);

    const startTutorial = useCallback((page: string, tutorialSteps: Step[]) => {
        setCurrentPage(page);
        setSteps(tutorialSteps);
        setRun(true);
    }, []);

    const stopTutorial = useCallback(() => {
        setRun(false);
    }, []);

    const resetTutorial = useCallback((page: string) => {
        setCompletedTutorials((prev) => {
            const next = new Set(prev);
            next.delete(page);
            return next;
        });
    }, []);

    const hasCompletedTutorial = useCallback(
        (page: string) => {
            return completedTutorials.has(page);
        },
        [completedTutorials]
    );

    const markTutorialComplete = useCallback((page: string) => {
        setCompletedTutorials((prev) => new Set(prev).add(page));
        setRun(false);
    }, []);

    return (
        <TutorialContext.Provider
            value={{
                run,
                steps,
                currentPage,
                startTutorial,
                stopTutorial,
                resetTutorial,
                hasCompletedTutorial,
                markTutorialComplete,
            }}
        >
            {children}
        </TutorialContext.Provider>
    );
}

export function useTutorial() {
    const context = useContext(TutorialContext);
    if (!context) {
        throw new Error('useTutorial must be used within a TutorialProvider');
    }
    return context;
}
