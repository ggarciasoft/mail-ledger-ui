import apiClient from './api-client';
import type {
  ApiKey,
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  GmailSyncHistory,
  GmailConnectionStatus,
} from '../types/settings';

export const settingsApi = {
  // API Keys
  getApiKeys: async (): Promise<ApiKey[]> => {
    const response = await apiClient.get<ApiKey[]>('/api/api-keys');
    return response.data;
  },

  createApiKey: async (data: CreateApiKeyRequest): Promise<CreateApiKeyResponse> => {
    const response = await apiClient.post<CreateApiKeyResponse>('/api/api-keys', data);
    return response.data;
  },

  deleteApiKey: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/api-keys/${id}`);
  },

  // Gmail Sync
  getGmailConnectionStatus: async (): Promise<GmailConnectionStatus> => {
    const response = await apiClient.get<GmailConnectionStatus>('/api/gmail/status');
    return response.data;
  },

  triggerGmailSync: async (): Promise<void> => {
    await apiClient.post('/api/gmail/sync');
  },

  getGmailSyncHistory: async (): Promise<GmailSyncHistory[]> => {
    const response = await apiClient.get<GmailSyncHistory[]>('/api/gmail/sync-history');
    return response.data;
  },
};
