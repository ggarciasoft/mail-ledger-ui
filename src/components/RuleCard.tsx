import { MoreVertical, Edit2, Power } from 'lucide-react';
import { useState } from 'react';
import type { Rule } from '../types/rule';

interface RuleCardProps {
    rule: Rule;
    onEdit: (rule: Rule) => void;
    onToggleActive: (ruleId: string, isActive: boolean) => void;
}

export default function RuleCard({ rule, onEdit, onToggleActive }: RuleCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    const getPriorityColor = (priority: number) => {
        if (priority >= 70) return 'bg-red-100 text-red-800 border-red-200';
        if (priority >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    const patterns = [
        { label: 'Sender', value: rule.senderPattern },
        { label: 'Subject', value: rule.subjectPattern },
        { label: 'Keyword', value: rule.keywordPattern },
        { label: 'Label', value: rule.labelPattern },
    ].filter(p => p.value);

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${rule.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Created {new Date(rule.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rule.priority)}`}>
                        Priority: {rule.priority}
                    </span>

                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                    <button
                                        onClick={() => {
                                            onEdit(rule);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Rule
                                    </button>
                                    <button
                                        onClick={() => {
                                            onToggleActive(rule.id, rule.isActive);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Power className="w-4 h-4" />
                                        {rule.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Patterns */}
            <div className="space-y-2">
                {patterns.map((pattern) => (
                    <div key={pattern.label} className="flex items-start gap-2">
                        <span className="text-sm font-medium text-gray-600 min-w-[80px]">{pattern.label}:</span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800 flex-1">
                            {pattern.value}
                        </code>
                    </div>
                ))}
            </div>
        </div>
    );
}
