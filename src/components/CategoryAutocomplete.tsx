import { useState, useRef, useEffect } from 'react';
import { Tag, ChevronDown, X } from 'lucide-react';
import { useCategories } from '../hooks/use-categories';

interface CategoryAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export default function CategoryAutocomplete({
    value,
    onChange,
    disabled = false,
    placeholder = 'Select or type category...',
}: CategoryAutocompleteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const { data: categoriesData, isLoading } = useCategories();

    const categories = categoriesData?.categories || [];

    // Filter categories based on input
    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync input value with prop value
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
        setIsOpen(true);
    };

    const handleSelectCategory = (categoryName: string) => {
        setInputValue(categoryName);
        onChange(categoryName);
        setIsOpen(false);
    };

    const handleClear = () => {
        setInputValue('');
        onChange('');
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {inputValue && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        disabled={disabled}
                        className="p-1 hover:bg-gray-100 rounded disabled:cursor-not-allowed"
                    >
                        <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading categories...</div>
                    ) : filteredCategories.length > 0 ? (
                        <ul className="py-1">
                            {filteredCategories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectCategory(category.name)}
                                        className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none flex items-center gap-2"
                                    >
                                        <Tag className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{category.name}</span>
                                        {category.description && (
                                            <span className="text-xs text-gray-500 ml-auto">
                                                {category.description}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : inputValue ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            Press Enter to create "{inputValue}"
                        </div>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            No categories yet. Start typing to create one.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
