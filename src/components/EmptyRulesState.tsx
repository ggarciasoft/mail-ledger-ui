import { Filter, Plus } from 'lucide-react';

interface EmptyRulesStateProps {
    onCreateRule: () => void;
}

export default function EmptyRulesState({ onCreateRule }: EmptyRulesStateProps) {
    return (
        <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Filter className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rules yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first rule to automatically filter and organize your emails based on sender, subject, keywords, or labels.
            </p>
            <button
                onClick={onCreateRule}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                <Plus className="w-5 h-5" />
                Create First Rule
            </button>
        </div>
    );
}
