import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SpendingTrendsResponse } from '../types/dashboard';

interface SpendingTrendsChartProps {
    data?: SpendingTrendsResponse;
    loading?: boolean;
}

export default function SpendingTrendsChart({ data, loading }: SpendingTrendsChartProps) {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-80 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-100 rounded"></div>
            </div>
        );
    }

    if (!data || data.data?.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-80 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">No spending data available</p>
                    <p className="text-sm text-gray-400 mt-1">Data will appear once transactions are confirmed</p>
                </div>
            </div>
        );
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Spending Trends</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Daily spending over the selected period
                </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        tickFormatter={formatCurrency}
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                        labelFormatter={formatDate}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '8px 12px',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="totalSpent"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
