---
trigger: always_on
---

Rules UI Implementation Plan
Overview
Build a comprehensive Rules management interface that allows users to create, edit, prioritize, and manage email filtering rules for the Mail Ledger application.

User Review Required
IMPORTANT

Technology Stack Confirmation

This plan assumes React with TypeScript
Using TailwindCSS for styling
React Query for API state management
React Hook Form for form handling
Zod for validation
Please confirm or specify alternative preferences.

Pages & Routes
1. Rules List Page (/rules)
Purpose: Display all rules with management actions

Features:

List all active rules sorted by priority (high to low)
Visual indicator for active (🟢) vs inactive (🔴) rules
Quick actions menu (⋮): Edit, Activate/Deactivate, Delete, Change Priority
Empty state when no rules exist
Search/filter functionality
2. Create/Edit Rule Modal
Purpose: Form for creating or editing a rule

Validation Rules:

Rule Name: Required, 3-100 characters
At least one pattern must be provided
Priority: Number between 0-100
Patterns: Optional but at least one required
Components
1. RuleCard Component
interface RuleCardProps {
  rule: Rule;
  onEdit: (rule: Rule) => void;
  onToggleActive: (ruleId: string) => void;
  onDelete: (ruleId: string) => void;
  onChangePriority: (ruleId: string, newPriority: number) => void;
}
Features:

Display rule name, patterns, priority, status
Quick toggle for active/inactive
Dropdown menu for actions
Drag handle for reordering (future enhancement)
2. RuleForm Component
interface RuleFormProps {
  rule?: Rule; // undefined for create, defined for edit
  onSubmit: (data: RuleFormData) => Promise<void>;
  onCancel: () => void;
}
Features:

Form validation with Zod
Real-time validation feedback
Pattern helper text
Submit/cancel actions
3. RulePatternInput Component
interface RulePatternInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText: string;
  error?: string;
}
Features:

Input with label and helper text
Wildcard pattern examples
Validation error display
4. EmptyRulesState Component
interface EmptyRulesStateProps {
  onCreateRule: () => void;
}
Features:

Illustration or icon
Helpful message
CTA button to create first rule
API Integration
TypeScript Types
interface Rule {
  id: string;
  name: string;
  senderPattern: string | null;
  subjectPattern: string | null;
  keywordPattern: string | null;
  labelPattern: string | null;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}
interface CreateRuleRequest {
  name: string;
  senderPattern?: string;
  subjectPattern?: string;
  keywordPattern?: string;
  labelPattern?: string;
  priority?: number;
}
interface UpdateRulePatternsRequest {
  senderPattern?: string;
  subjectPattern?: string;
  keywordPattern?: string;
  labelPattern?: string;
}
interface UpdateRulePriorityRequest {
  priority: number;
}
API Service
// src/services/rulesApi.ts
import { apiClient } from './apiClient';
export const rulesApi = {
  // Get all rules
  getRules: async (): Promise<Rule[]> => {
    const response = await apiClient.get('/api/rules');
    return response.data;
  },
  // Get single rule
  getRule: async (id: string): Promise<Rule> => {
    const response = await apiClient.get(`/api/rules/${id}`);
    return response.data;
  },
  // Create rule
  createRule: async (data: CreateRuleRequest): Promise<Rule> => {
    const response = await apiClient.post('/api/rules', data);
    return response.data.rule;
  },
  // Update rule patterns
  updateRulePatterns: async (
    id: string,
    data: UpdateRulePatternsRequest
  ): Promise<void> => {
    await apiClient.put(`/api/rules/${id}/patterns`, data);
  },
  // Update rule priority
  updateRulePriority: async (
    id: string,
    priority: number
  ): Promise<void> => {
    await apiClient.put(`/api/rules/${id}/priority`, { priority });
  },
  // Activate rule
  activateRule: async (id: string): Promise<void> => {
    await apiClient.post(`/api/rules/${id}/activate`);
  },
  // Deactivate rule
  deactivateRule: async (id: string): Promise<void> => {
    await apiClient.post(`/api/rules/${id}/deactivate`);
  },
};
React Query Hooks
// src/hooks/useRules.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rulesApi } from '../services/rulesApi';
export const useRules = () => {
  return useQuery({
    queryKey: ['rules'],
    queryFn: rulesApi.getRules,
  });
};
export const useCreateRule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: rulesApi.createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};
export const useUpdateRulePatterns = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRulePatternsRequest }) =>
      rulesApi.updateRulePatterns(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};
export const useToggleRuleActive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      isActive ? rulesApi.deactivateRule(id) : rulesApi.activateRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};
User Flows
Flow 1: Create New Rule
User clicks "+ New Rule" button
Modal opens with empty form
User fills in rule name (required)
User adds at least one pattern (sender, subject, keyword, or label)
User sets priority (optional, defaults to 0)
User clicks "Create Rule"
Form validates
API call to POST /api/rules
Success: Modal closes, rule appears in list, toast notification
Error: Display error message in form
Flow 2: Edit Existing Rule
User clicks "Edit" on a rule card
Modal opens pre-filled with rule data
User modifies patterns or name
User clicks "Save Changes"
API call to PUT /api/rules/{id}/patterns
Success: Modal closes, rule updates in list, toast notification
Error: Display error message
Flow 3: Toggle Rule Active/Inactive
User clicks toggle switch on rule card
Optimistic UI update (immediate visual feedback)
API call to POST /api/rules/{id}/activate or /deactivate
Success: Toast notification
Error: Revert UI, show error toast
Flow 4: Change Rule Priority
User clicks "Change Priority" from dropdown menu
Small modal/popover with number input
User enters new priority
API call to PUT /api/rules/{id}/priority
Success: Rule re-sorts in list, toast notification
Error: Show error toast
Form Validation (Zod Schema)
import { z } from 'zod';
export const ruleFormSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  senderPattern: z.string().optional(),
  subjectPattern: z.string().optional(),
  keywordPattern: z.string().optional(),
  labelPattern: z.string().optional(),
  priority: z.number()
    .int()
    .min(0, 'Priority must be at least 0')
    .max(100, 'Priority must be at most 100')
    .optional()
    .default(0),
}).refine(
  (data) => 
    data.senderPattern || 
    data.subjectPattern || 
    data.keywordPattern || 
    data.labelPattern,
  {
    message: 'At least one pattern must be provided',
    path: ['senderPattern'], // Show error on first field
  }
);
State Management
Local State (Component)
Form inputs
Modal open/close
Dropdown menu state
Server State (React Query)
Rules list
Individual rule data
Mutation states (loading, error)
Global State (Optional - Context/Zustand)
Currently editing rule ID
Toast notifications
UI/UX Enhancements
Visual Indicators
🟢 Green dot for active rules
🔴 Red dot for inactive rules
Priority badge (color-coded: high=red, medium=yellow, low=green)
Pattern pills/tags for easy scanning
Interactions
Hover effects on rule cards
Smooth transitions for active/inactive toggle
Loading states during API calls
Optimistic updates for better UX
Confirmation dialog for destructive actions (delete)
Responsive Design
Mobile: Stack rule cards vertically
Tablet: 2-column grid
Desktop: Full-width cards with all details
Accessibility
Keyboard navigation
ARIA labels for screen readers
Focus management in modals
Color contrast compliance
Error Handling
API Errors
try {
  await createRule(data);
  toast.success('Rule created successfully');
} catch (error) {
  if (error.response?.status === 400) {
    toast.