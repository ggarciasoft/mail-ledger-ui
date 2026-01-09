import type { EmailStatus } from '../types/email';

interface StatusBadgeProps {
    status: EmailStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Classified: 'bg-blue-100 text-blue-800 border-blue-200',
        Extracted: 'bg-green-100 text-green-800 border-green-200',
        Failed: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
        >
            {status}
        </span>
    );
}
