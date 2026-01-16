import apiClient from './api-client';
import type {
  Rule,
  CreateRuleRequest,
  UpdateRuleRequest,
} from '../types/rule';

export const rulesApi = {
  // Get all rules
  getRules: async (): Promise<Rule[]> => {
    const response = await apiClient.get<Rule[]>('/rules');
    return response.data;
  },

  // Get single rule
  getRule: async (id: string): Promise<Rule> => {
    const response = await apiClient.get<Rule>(`/rules/${id}`);
    return response.data;
  },

  // Create rule
  createRule: async (data: CreateRuleRequest): Promise<Rule> => {
    const response = await apiClient.post<{ rule: Rule }>('/rules', data);
    return response.data.rule;
  },

  // Update rule (name, priority, and patterns)
  updateRule: async (
    id: string,
    data: UpdateRuleRequest
  ): Promise<void> => {
    await apiClient.put(`/rules/${id}`, data);
  },

  // Activate rule
  activateRule: async (id: string): Promise<void> => {
    await apiClient.post(`/rules/${id}/activate`);
  },

  // Deactivate rule
  deactivateRule: async (id: string): Promise<void> => {
    await apiClient.post(`/rules/${id}/deactivate`);
  },
};
