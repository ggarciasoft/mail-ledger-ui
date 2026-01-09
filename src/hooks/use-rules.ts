import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rulesApi } from '../lib/rules-api';
import type { CreateRuleRequest, UpdateRuleRequest } from '../types/rule';

// Get all rules
export const useRules = () => {
  return useQuery({
    queryKey: ['rules'],
    queryFn: rulesApi.getRules,
  });
};

// Get single rule
export const useRule = (id: string) => {
  return useQuery({
    queryKey: ['rules', id],
    queryFn: () => rulesApi.getRule(id),
    enabled: !!id,
  });
};

// Create rule
export const useCreateRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRuleRequest) => rulesApi.createRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

// Update rule (name, priority, and patterns)
export const useUpdateRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRuleRequest }) =>
      rulesApi.updateRule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

// Toggle rule active/inactive
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
