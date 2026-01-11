import type { JobStatus } from '../types/processing-job';
import { CheckCircle, XCircle, Clock, Loader2, Ban } from 'lucide-react';

interface JobStatusBadgeProps {
    status: JobStatus;
    className?: string;
}

export default function JobStatusBadge({ status, className = '' }: JobStatusBadgeProps) {
    const getStatusConfig = () => {
        switch (status) {
            case 'Pending':
                return {
                    icon: Clock,
                    text: 'Pending',
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    iconColor: 'text-gray-500',
                };
            case 'Running':
                return {
                    icon: Loader2,
                    text: 'Running',
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-700',
                    iconColor: 'text-blue-500',
                    animate: true,
                };
            case 'Completed':
                return {
                    icon: CheckCircle,
                    text: 'Completed',
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    iconColor: 'text-green-500',
                };
            case 'Failed':
                return {
                    icon: XCircle,
                    text: 'Failed',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    iconColor: 'text-red-500',
                };
            case 'Cancelled':
                return {
                    icon: Ban,
                    text: 'Cancelled',
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-700',
                    iconColor: 'text-orange-500',
                };
        }
    };

    const config = getStatusConfig();
    if (config == null) {
        return null;
    }
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${className}`}
        >
            <Icon
                className={`w-3.5 h-3.5 mr-1 ${config.iconColor} ${config.animate ? 'animate-spin' : ''}`}
            />
            {config.text}
        </span>
    );
}
