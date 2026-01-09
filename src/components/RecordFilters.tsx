import { useState } from 'react';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface RecordFiltersProps {
    onFiltersChange: (filters: {
        startDate?: string;
        endDate?: string;
        minAmount?: number;
        maxAmount?: number;
        merchant?: string;
        currency?: string;
        sourceBank?: string;
        transactionType?: string;
    }) => void;
}

export default function RecordFilters({ onFiltersChange }: RecordFiltersProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [merchant, setMerchant] = useState('');
    const [currency, setCurrency] = useState('');
    const [sourceBank, setSourceBank] = useState('');
    const [transactionType, setTransactionType] = useState('');

    const handleApplyFilters = () => {
        onFiltersChange({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            minAmount: minAmount ? parseFloat(minAmount) : undefined,
            maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
            merchant: merchant || undefined,
            currency: currency || undefined,
            sourceBank: sourceBank || undefined,
            transactionType: transactionType || undefined,
        });
    };

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setMinAmount('');
        setMaxAmount('');
        setMerchant('');
        setCurrency('');
        setSourceBank('');
        setTransactionType('');
        onFiltersChange({});
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    Advanced Filters
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                {/* Amount Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Min Amount
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Max Amount
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="0.00"
                    />
                </div>

                {/* Merchant */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Search className="w-4 h-4 inline mr-1" />
                        Merchant
                    </label>
                    <input
                        type="text"
                        value={merchant}
                        onChange={(e) => setMerchant(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Search merchant..."
                    />
                </div>

                {/* Currency */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g., USD"
                    />
                </div>

                {/* Source Bank */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Bank</label>
                    <input
                        type="text"
                        value={sourceBank}
                        onChange={(e) => setSourceBank(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Bank name..."
                    />
                </div>

                {/* Transaction Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                    <input
                        type="text"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Type..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                >
                    Clear
                </button>
                <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
