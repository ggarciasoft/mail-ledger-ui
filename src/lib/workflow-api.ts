import { apiClient } from './api-client';
import type { WorkflowConfiguration, UpdateWorkflowConfigRequest } from '../types/workflow';

export const workflowApi = {
  getConfiguration: async (): Promise<WorkflowConfiguration> => {
    const { data } = await apiClient.get('/workflow/configuration');
    return data;
  },

  updateConfiguration: async (config: UpdateWorkflowConfigRequest): Promise<void> => {
    await apiClient.put('/workflow/configuration', config);
  },
};
