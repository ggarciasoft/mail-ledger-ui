import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RulePatternInput from './RulePatternInput';
import type { Rule, CreateRuleRequest, UpdateRuleRequest } from '../types/rule';

interface RuleFormProps {
    rule?: Rule;
    onSubmit: (data: CreateRuleRequest | UpdateRuleRequest) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function RuleForm({ rule, onSubmit, onCancel, isLoading }: RuleFormProps) {
    const [formData, setFormData] = useState({
        name: rule?.name || '',
        senderPattern: rule?.senderPattern || '',
        subjectPattern: rule?.subjectPattern || '',
        keywordPattern: rule?.keywordPattern || '',
        labelPattern: rule?.labelPattern || '',
        priority: rule?.priority || 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (rule) {
            setFormData({
                name: rule.name,
                senderPattern: rule.senderPattern || '',
                subjectPattern: rule.subjectPattern || '',
                keywordPattern: rule.keywordPattern || '',
                labelPattern: rule.labelPattern || '',
                priority: rule.priority,
            });
        }
    }, [rule]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name || formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }
        if (formData.name.length > 100) {
            newErrors.name = 'Name must be less than 100 characters';
        }

        const hasPattern = formData.senderPattern || formData.subjectPattern ||
            formData.keywordPattern || formData.labelPattern;
        if (!hasPattern) {
            newErrors.senderPattern = 'At least one pattern must be provided';
        }

        if (formData.priority < 0 || formData.priority > 100) {
            newErrors.priority = 'Priority must be between 0 and 100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        const submitData: CreateRuleRequest | UpdateRuleRequest = {
            name: formData.name,
            senderPattern: formData.senderPattern || undefined,
            subjectPattern: formData.subjectPattern || undefined,
            keywordPattern: formData.keywordPattern || undefined,
            labelPattern: formData.labelPattern || undefined,
            priority: formData.priority,
        };

        await onSubmit(submitData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {rule ? 'Edit Rule' : 'Create New Rule'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Rule Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Rule Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Important Client Emails"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Priority (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.priority ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
                        <p className="text-xs text-gray-500">Higher priority rules are evaluated first</p>
                    </div>

                    {/* Patterns */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Patterns <span className="text-sm font-normal text-gray-500">(at least one required)</span>
                        </h3>

                        <RulePatternInput
                            label="Sender Pattern"
                            value={formData.senderPattern}
                            onChange={(value) => setFormData({ ...formData, senderPattern: value })}
                            placeholder="e.g., *@example.com"
                            helperText="Use * as wildcard. Example: *@company.com matches all emails from company.com"
                            error={errors.senderPattern}
                        />

                        <RulePatternInput
                            label="Subject Pattern"
                            value={formData.subjectPattern}
                            onChange={(value) => setFormData({ ...formData, subjectPattern: value })}
                            placeholder="e.g., Invoice*"
                            helperText="Use * as wildcard. Example: Invoice* matches subjects starting with 'Invoice'"
                        />

                        <RulePatternInput
                            label="Keyword Pattern"
                            value={formData.keywordPattern}
                            onChange={(value) => setFormData({ ...formData, keywordPattern: value })}
                            placeholder="e.g., urgent,important"
                            helperText="Comma-separated keywords to search in email body"
                        />

                        <RulePatternInput
                            label="Label Pattern"
                            value={formData.labelPattern}
                            onChange={(value) => setFormData({ ...formData, labelPattern: value })}
                            placeholder="e.g., IMPORTANT"
                            helperText="Email label to match"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : rule ? 'Save Changes' : 'Create Rule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
