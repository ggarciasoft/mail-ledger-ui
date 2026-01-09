import apiClient from './api-client';
import type {
  ProcessingStatus,
  TriggerClassificationRequest,
  TriggerExtractionRequest,
} from '../types/processing';

export const processingApi = {
  // Get current processing status
  getStatus: async (): Promise<ProcessingStatus> => {
    const response = await apiClient.get<ProcessingStatus>('/api/processing/status');
    return response.data;
  },

  // Trigger classification job
  triggerClassification: async (data: TriggerClassificationRequest = {}): Promise<void> => {
    await apiClient.post('/api/processing/classify', data);
  },

  // Trigger extraction job
  triggerExtraction: async (data: TriggerExtractionRequest = {}): Promise<void> => {
    await apiClient.post('/api/processing/extract', data);
  },
};
