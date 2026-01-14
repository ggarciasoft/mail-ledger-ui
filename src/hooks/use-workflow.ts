import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workflowApi } from '../lib/workflow-api';
import type { UpdateWorkflowConfigRequest } from '../types/workflow';

export function useWorkflowConfiguration() {
  return useQuery({
    queryKey: ['workflow', 'configuration'],
    queryFn: workflowApi.getConfiguration,
  });
}

export function useUpdateWorkflowConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: UpdateWorkflowConfigRequest) =>
      workflowApi.updateConfiguration(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow'] });
    },
  });
}
