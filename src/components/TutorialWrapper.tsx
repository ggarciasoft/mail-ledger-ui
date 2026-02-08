import Joyride, { type CallBackProps, STATUS, EVENTS } from 'react-joyride';
import { useTutorial } from '../contexts/TutorialContext';

export function TutorialWrapper() {
    const { run, steps, currentPage, stopTutorial, markTutorialComplete } = useTutorial();

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, type } = data;

        // Tutorial finished or skipped
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            if (status === STATUS.FINISHED) {
                // Mark as completed only if user finished the tour
                markTutorialComplete(currentPage);
            }
            stopTutorial();
        }

        // User closed the tutorial
        if (type === EVENTS.TOUR_END) {
            stopTutorial();
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#2563eb', // blue-600
                    textColor: '#1f2937', // gray-800
                    backgroundColor: '#ffffff',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    arrowColor: '#ffffff',
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: 8,
                    fontSize: 14,
                },
                tooltipContainer: {
                    textAlign: 'left',
                },
                tooltipTitle: {
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 8,
                },
                tooltipContent: {
                    padding: '12px 0',
                },
                buttonNext: {
                    backgroundColor: '#2563eb',
                    borderRadius: 6,
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 500,
                },
                buttonBack: {
                    color: '#6b7280',
                    marginRight: 8,
                },
                buttonSkip: {
                    color: '#6b7280',
                },
            }}
            locale={{
                back: 'Back',
                close: 'Close',
                last: 'Finish',
                next: 'Next',
                skip: 'Skip tutorial',
            }}
        />
    );
}
