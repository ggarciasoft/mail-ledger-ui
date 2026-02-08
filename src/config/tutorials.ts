import type { Step } from 'react-joyride';

export interface PageTutorial {
    page: string;
    steps: Step[];
}

export const tutorials: Record<string, Step[]> = {
    dashboard: [
        {
            target: '.overview-cards',
            content: 'These cards show your key metrics at a glance: total financial records, pending candidates awaiting review, and processed emails.',
            title: 'Overview Cards',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.period-selector',
            content: 'Filter your data by time period. Choose from 7 days, 30 days, 90 days, 1 year, or view all time data.',
            title: 'Time Period Filter',
            placement: 'bottom',
        },
        {
            target: '.spending-trends-chart',
            content: 'Visualize your spending patterns over time. This chart helps you identify trends and anomalies in your financial data.',
            title: 'Spending Trends',
            placement: 'top',
        },
        {
            target: '.top-merchants-chart',
            content: 'See your most frequent merchants at a glance. This helps you understand where your money is going.',
            title: 'Top Merchants',
            placement: 'top',
        },
        {
            target: 'nav',
            content: 'Use the sidebar to navigate between different sections: Emails, Candidates, Records, Processing, Rules, and Settings.',
            title: 'Navigation',
            placement: 'right',
        },
    ],

    emails: [
        {
            target: '.email-filters',
            content: 'Filter emails by status (Classified/Pending/Rejected), subject, or sender to find what you need quickly.',
            title: 'Email Filters',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.email-list',
            content: 'Browse all your ingested emails. Click on any email to view its full content and classification details.',
            title: 'Email List',
            placement: 'top',
        },
        {
            target: '.classification-badge',
            content: 'These badges show the AI classification result: Financial (contains transaction data), Non-Financial.',
            title: 'Classification Status',
            placement: 'left',
        },
    ],

    'extraction-candidates': [
        {
            target: '.candidate-filters',
            content: 'Filter candidates by status (Pending/Confirmed/Rejected), transaction type, date range, merchant, or amount.',
            title: 'Candidate Filters',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.bulk-select-checkbox',
            content: 'Select multiple candidates at once for bulk confirmation or rejection. This saves time when processing many similar transactions.',
            title: 'Bulk Selection',
            placement: 'right',
        },
        {
            target: '.bulk-action-toolbar',
            content: 'When you select candidates, this toolbar appears with bulk actions. Confirm or reject multiple candidates with one click.',
            title: 'Bulk Actions',
            placement: 'top',
        },
        {
            target: '.confidence-meter',
            content: 'The confidence meter shows how certain the AI is about the extracted data. Higher confidence means more accurate extraction.',
            title: 'AI Confidence',
            placement: 'left',
        },
        {
            target: '.candidate-review-button',
            content: 'Click to review and edit candidate details before confirming. You can modify any field if the AI made a mistake.',
            title: 'Review Candidate',
            placement: 'left',
        },
    ],

    'financial-records': [
        {
            target: '.record-filters',
            content: 'Use these advanced filters to find specific records. Filter by type, direction, date, merchant, amount, currency, or account.',
            title: 'Advanced Filters',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.record-list',
            content: 'All your confirmed financial records are listed here. These are immutable once confirmed, ensuring data integrity.',
            title: 'Financial Records',
            placement: 'top',
        },
        {
            target: '.record-detail-button',
            content: 'Click to view full record details, including the source email and extraction metadata.',
            title: 'View Details',
            placement: 'left',
        },
        {
            target: '.sort-controls',
            content: 'Sort records by date, amount, or merchant to organize your data the way you need.',
            title: 'Sorting',
            placement: 'left',
        },
    ],

    processing: [
        {
            target: '.classification-section',
            content: 'Trigger AI classification to analyze your emails and identify which ones contain financial data.',
            title: 'Email Classification',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.extraction-section',
            content: 'Run AI extraction to pull transaction details (amount, merchant, date) from classified financial emails.',
            title: 'Data Extraction',
            placement: 'bottom',
        },
        {
            target: '.batch-size-input',
            content: 'Control how many emails to process in one batch. Smaller batches are faster but process fewer emails.',
            title: 'Batch Size',
            placement: 'top',
        },
        {
            target: '.progress-indicator',
            content: 'Track the progress of your processing jobs in real-time. See success and failure counts as the job runs.',
            title: 'Job Progress',
            placement: 'top',
        },
    ],

    rules: [
        {
            target: '.create-rule-button',
            content: 'Create custom rules to control which emails are synced during email synchronization. Filter by sender, subject, or content.',
            title: 'Create Sync Rule',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.rule-card',
            content: 'Each rule controls email sync behavior. Toggle the switch to enable or disable rules without deleting them.',
            title: 'Rule Cards',
            placement: 'top',
        },
        {
            target: '.rule-conditions',
            content: 'Define conditions like "sender equals" or "subject contains" to match specific emails during sync.',
            title: 'Rule Conditions',
            placement: 'right',
        },
        {
            target: '.rule-actions',
            content: 'Choose what happens when conditions match during email sync: Ignore (skip), Classify, Extract, or Flag for Review.',
            title: 'Rule Actions',
            placement: 'right',
        },
    ],

    workflow: [
        {
            target: '.workflow-mode-section',
            content: 'Choose how your email processing runs: Manual (trigger yourself), Separate Schedules (each job runs independently), or Sequential Pipeline (jobs run in order).',
            title: 'Workflow Modes',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.schedule-config-section',
            content: 'Configure when your automated jobs run using cron expressions. Choose from presets (hourly, daily, weekly) or create custom schedules.',
            title: 'Schedule Configuration',
            placement: 'top',
        },
        {
            target: '.timezone-section',
            content: 'Select your timezone to ensure jobs run at the correct local time. The system auto-detects your timezone by default.',
            title: 'Timezone Settings',
            placement: 'top',
        },
        {
            target: '.batch-size-section',
            content: 'Control how many items each automated job processes. Smaller batches are faster but process fewer items per run.',
            title: 'Batch Sizes',
            placement: 'top',
        },
    ],

    settings: [
        {
            target: '.profile-section',
            content: 'View and manage your account profile information, including your email and account details.',
            title: 'Profile',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.notification-preferences-section',
            content: 'Configure your notification preferences to control how and when you receive updates about your financial data.',
            title: 'Notification Preferences',
            placement: 'bottom',
        },
    ],
};

// Get tutorial steps for a specific page
export function getTutorialSteps(page: string): Step[] | undefined {
    return tutorials[page];
}

// Check if a page has a tutorial
export function hasTutorial(page: string): boolean {
    return page in tutorials && tutorials[page].length > 0;
}
