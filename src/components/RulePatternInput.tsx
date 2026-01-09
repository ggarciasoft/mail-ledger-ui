interface RulePatternInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    helperText: string;
    error?: string;
}

export default function RulePatternInput({
    label,
    value,
    onChange,
    placeholder,
    helperText,
    error,
}: RulePatternInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
            />
            {error ? (
                <p className="text-sm text-red-600">{error}</p>
            ) : (
                <p className="text-xs text-gray-500">{helperText}</p>
            )}
        </div>
    );
}
