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
  triggerClassification: async (data: TriggerClassificationRequest = {}): Promise<{ jobId: string; message: string }> => {
    const response = await apiClient.post<{ jobId: string; message: string }>('api/processing/classify', null, { params: data });
    return response.data;
  },

  // Trigger extraction job
  triggerExtraction: async (data: TriggerExtractionRequest = {}): Promise<{ jobId: string; message: string }> => {
    const response = await apiClient.post<{ jobId: string; message: string }>('api/processing/extract', null, { params: data });
    return response.data;
  },
};
