import { useDashboardOverview, useSpendingTrends, useTopMerchants } from '../hooks/use-dashboard';
import OverviewCards from '../components/OverviewCards';
import SpendingTrendsChart from '../components/SpendingTrendsChart';
import TopMerchantsChart from '../components/TopMerchantsChart';
import PeriodSelector from '../components/PeriodSelector';
import { AlertCircle } from 'lucide-react';
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

export default function DashboardPage() {
    // Auto-start tutorial on first visit
    useAutoStartTutorial('dashboard');

    const { data: overview, isLoading: overviewLoading, error: overviewError } = useDashboardOverview();
    const {
        data: spendingTrends,
        isLoading: trendsLoading,
        error: trendsError,
        period: trendsPeriod,
        setPeriod: setTrendsPeriod,
    } = useSpendingTrends();
    const {
        data: topMerchants,
        isLoading: merchantsLoading,
        error: merchantsError,
        setPeriod: setMerchantsPeriod,
    } = useTopMerchants();

    // Sync period selectors
    const handlePeriodChange = (period: 'week' | 'month' | 'year') => {
        setTrendsPeriod(period);
        setMerchantsPeriod(period);
    };

    if (overviewError || trendsError || merchantsError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Dashboard</h3>
                        <p className="text-red-700 text-sm">
                            {(overviewError as Error)?.message ||
                                (trendsError as Error)?.message ||
                                (merchantsError as Error)?.message ||
                                'Failed to load dashboard data. Please try again later.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome to your MailLedger financial overview</p>
            </div>

            {/* Overview Cards */}
            <div className="mb-8 overview-cards">
                <OverviewCards data={overview} loading={overviewLoading} />
            </div>

            {/* Period Selector */}
            <div className="mb-6 flex justify-end period-selector">
                <PeriodSelector value={trendsPeriod} onChange={handlePeriodChange} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="spending-trends-chart">
                    <SpendingTrendsChart data={spendingTrends} loading={trendsLoading} />
                </div>
                <div className="top-merchants-chart">
                    <TopMerchantsChart data={topMerchants} loading={merchantsLoading} />
                </div>
            </div>
        </div>
    );
}
