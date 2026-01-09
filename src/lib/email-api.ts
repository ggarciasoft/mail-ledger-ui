import apiClient from './api-client';
import type {
  Email,
  EmailListRequest,
  EmailListResponse,
  EmailStatistics,
} from '../types/email';

export const emailApi = {
  // Get emails list with filters and pagination
  getEmails: async (params: EmailListRequest = {}): Promise<EmailListResponse> => {
    const response = await apiClient.get<EmailListResponse>('/api/emails', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        status: params.status,
        search: params.search,
        sortBy: params.sortBy || 'receivedAt',
        sortDirection: params.sortDirection || 'desc',
      },
    });
    return response.data;
  },

  // Get single email by ID
  getEmailById: async (id: string): Promise<Email> => {
    const response = await apiClient.get<Email>(`/api/emails/${id}`);
    return response.data;
  },

  // Get email statistics
  getStatistics: async (): Promise<EmailStatistics> => {
    const response = await apiClient.get<EmailStatistics>('/api/emails/statistics');
    return response.data;
  },
};
