import type { Period } from '../hooks/use-dashboard';

interface PeriodSelectorProps {
    value: Period;
    onChange: (period: Period) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
    const periods: { value: Period; label: string }[] = [
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
    ];

    return (
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {periods.map((period) => (
                <button
                    key={period.value}
                    onClick={() => onChange(period.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${value === period.value
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {period.label}
                </button>
            ))}
        </div>
    );
}
