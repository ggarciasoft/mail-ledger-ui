import { Search, Filter } from 'lucide-react';
import type { EmailStatus } from '../types/email';

interface EmailFiltersProps {
    status?: EmailStatus;
    search?: string;
    onStatusChange: (status: EmailStatus | undefined) => void;
    onSearchChange: (search: string | undefined) => void;
}

export default function EmailFilters({
    status,
    search,
    onStatusChange,
    onSearchChange,
}: EmailFiltersProps) {
    const statuses: (EmailStatus | undefined)[] = [undefined, 'Pending', 'Classified', 'Extracted', 'Failed'];

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onSearchChange(value.trim() === '' ? undefined : value);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by subject or sender..."
                            value={search || ''}
                            onChange={handleSearchInput}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="md:w-48">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={status || ''}
                            onChange={(e) => onStatusChange(e.target.value as EmailStatus | undefined || undefined)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            {statuses.map((s) => (
                                <option key={s || 'all'} value={s || ''}>
                                    {s || 'All Status'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
