import { useState } from 'react';
import { Plus, AlertCircle, Filter } from 'lucide-react';
import { useRules, useCreateRule, useUpdateRule, useToggleRuleActive } from '../hooks/use-rules';
import RuleCard from '../components/RuleCard';
import RuleForm from '../components/RuleForm';
import EmptyRulesState from '../components/EmptyRulesState';
import type { Rule, CreateRuleRequest, UpdateRuleRequest } from '../types/rule';

export default function RulesPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { data: rules, isLoading, error } = useRules();
    const createRule = useCreateRule();
    const updateRule = useUpdateRule();
    const toggleActive = useToggleRuleActive();

    const handleCreateRule = async (data: CreateRuleRequest | UpdateRuleRequest) => {
        try {
            await createRule.mutateAsync(data as CreateRuleRequest);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to create rule:', error);
        }
    };

    const handleUpdateRule = async (data: CreateRuleRequest | UpdateRuleRequest) => {
        if (!editingRule) return;

        try {
            await updateRule.mutateAsync({ id: editingRule.id, data: data as UpdateRuleRequest });
            setEditingRule(null);
            setShowForm(false);
        } catch (error) {
            console.error('Failed to update rule:', error);
        }
    };

    const handleToggleActive = async (ruleId: string, isActive: boolean) => {
        try {
            await toggleActive.mutateAsync({ id: ruleId, isActive });
        } catch (error) {
            console.error('Failed to toggle rule:', error);
        }
    };

    const handleEdit = (rule: Rule) => {
        setEditingRule(rule);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingRule(null);
    };

    // Filter and sort rules
    const filteredRules = rules
        ?.filter(rule =>
            rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.senderPattern?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.subjectPattern?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => b.priority - a.priority) || [];

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Rules</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load rules. Please try again later.'}
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
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Rules</h1>
                        <p className="text-gray-600">Create and manage email filtering rules</p>
                    </div>
                    {rules && rules.length > 0 && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            New Rule
                        </button>
                    )}
                </div>

                {/* Search */}
                {rules && rules.length > 0 && (
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search rules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="ml-4 text-gray-500">Loading rules...</p>
                </div>
            ) : !rules || rules.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200">
                    <EmptyRulesState onCreateRule={() => setShowForm(true)} />
                </div>
            ) : filteredRules.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No rules match your search.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredRules.map((rule) => (
                        <RuleCard
                            key={rule.id}
                            rule={rule}
                            onEdit={handleEdit}
                            onToggleActive={handleToggleActive}
                        />
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <RuleForm
                    rule={editingRule || undefined}
                    onSubmit={editingRule ? handleUpdateRule : handleCreateRule}
                    onCancel={handleCloseForm}
                    isLoading={createRule.isPending || updateRule.isPending}
                />
            )}
        </div>
    );
}
