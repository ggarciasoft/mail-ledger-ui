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
    const response = await apiClient.get<ApiKey[]>('/api-keys');
    return response.data;
  },

  createApiKey: async (data: CreateApiKeyRequest): Promise<CreateApiKeyResponse> => {
    const response = await apiClient.post<CreateApiKeyResponse>('/api-keys', data);
    return response.data;
  },

  deleteApiKey: async (id: string): Promise<void> => {
    await apiClient.delete(`/api-keys/${id}`);
  },

  // Gmail Sync
  getGmailAuthUrl: async (): Promise<{ url: string }> => {
    const response = await apiClient.get<{ url: string }>('/gmail/auth-url');
    return response.data;
  },

  getGmailConnectionStatus: async (): Promise<GmailConnectionStatus> => {
    const response = await apiClient.get<GmailConnectionStatus>('/gmail/status');
    return response.data;
  },

  triggerGmailSync: async (maxEmails: number = 50): Promise<{ jobId: string; message: string }> => {
    const response = await apiClient.post<{ jobId: string; message: string }>(`/gmail/sync?maxEmails=${maxEmails}`);
    return response.data;
  },

  getGmailSyncHistory: async (): Promise<GmailSyncHistory> => {
    const response = await apiClient.get<GmailSyncHistory>('/gmail/sync-history');
    return response.data;
  },
};
