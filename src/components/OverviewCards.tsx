import { Mail, CheckCircle, Clock, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import type { DashboardOverview } from '../types/dashboard';

interface OverviewCardsProps {
    data?: DashboardOverview;
    loading?: boolean;
}

export default function OverviewCards({ data, loading }: OverviewCardsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
                title="Total Emails"
                value={data?.totalEmails ?? 0}
                icon={Mail}
                subtitle={`${data?.processedEmails ?? 0} processed`}
                loading={loading}
            />

            <StatCard
                title="Pending Candidates"
                value={data?.pendingCandidates ?? 0}
                icon={Clock}
                subtitle="Awaiting confirmation"
                loading={loading}
            />

            <StatCard
                title="Confirmed Records"
                value={data?.confirmedRecords ?? 0}
                icon={CheckCircle}
                subtitle="Financial records"
                loading={loading}
            />

            <StatCard
                title="Total Spending"
                value={data ? formatCurrency(data.totalSpending) : '$0'}
                icon={DollarSign}
                loading={loading}
            />

            <StatCard
                title="Avg Transaction"
                value={data ? formatCurrency(data.averageTransactionAmount) : '$0'}
                icon={TrendingUp}
                loading={loading}
            />

            <StatCard
                title="Last Sync"
                value={data ? formatDate(data.lastSyncTime) : 'Never'}
                icon={Calendar}
                loading={loading}
            />
        </div>
    );
}
