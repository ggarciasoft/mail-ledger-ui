import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { TopMerchantsResponse } from '../types/dashboard';

interface TopMerchantsChartProps {
    data?: TopMerchantsResponse;
    loading?: boolean;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function TopMerchantsChart({ data, loading }: TopMerchantsChartProps) {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-80 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-100 rounded"></div>
            </div>
        );
    }

    if (!data || data.merchants.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-80 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">No merchant data available</p>
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

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Merchants</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Highest spending by merchant
                </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.merchants} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        type="number"
                        tickFormatter={formatCurrency}
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="merchantName"
                        width={120}
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '8px 12px',
                        }}
                    />
                    <Bar dataKey="totalAmount" radius={[0, 8, 8, 0]}>
                        {data.merchants.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
                {data.merchants.map((merchant, index) => (
                    <div key={merchant.merchantName} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-gray-700">{merchant.merchantName}</span>
                        </div>
                        <div className="text-right">
                            <span className="font-medium text-gray-900">{formatCurrency(merchant.totalAmount)}</span>
                            <span className="text-gray-500 ml-2">({merchant.transactionCount} txns)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
