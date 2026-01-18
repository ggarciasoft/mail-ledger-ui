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
    const response = await apiClient.get<EmailListResponse>('/emails', {
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
    const response = await apiClient.get<Email>(`/emails/${id}`);
    return response.data;
  },

  // Get email statistics
  getStatistics: async (): Promise<EmailStatistics> => {
    const response = await apiClient.get<EmailStatistics>('/emails/statistics');
    return response.data;
  },

  // Delete single email
  deleteEmail: async (emailId: string): Promise<void> => {
    await apiClient.delete(`/emails/${emailId}`);
  },

  // Bulk delete emails
  bulkDeleteEmails: async (emailIds: string[]): Promise<{ totalRequested: number; succeeded: number; failed: number; errors: Array<{ emailId: string; error: string }> }> => {
    const response = await apiClient.post('/emails/bulk-delete', { emailIds });
    return response.data;
  },
};
