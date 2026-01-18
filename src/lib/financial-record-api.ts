import apiClient from './api-client';
import type {
  FinancialRecord,
  FinancialRecordListRequest,
  FinancialRecordListResponse,
  FinancialRecordStatistics,
} from '../types/financial-record';

export const financialRecordApi = {
  // Get records list with filters and pagination
  getRecords: async (params: FinancialRecordListRequest = {}): Promise<FinancialRecordListResponse> => {
    const response = await apiClient.get<FinancialRecordListResponse>('/financial-records', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        startDate: params.startDate,
        endDate: params.endDate,
        minAmount: params.minAmount,
        maxAmount: params.maxAmount,
        merchant: params.merchant,
        currency: params.currency,
        sourceBank: params.sourceBank,
        transactionType: params.transactionType,
        sortBy: params.sortBy || 'transactionDate',
        sortDirection: params.sortDirection || 'desc',
      },
    });
    return response.data;
  },

  // Get single record by ID
  getRecordById: async (id: string): Promise<FinancialRecord> => {
    const response = await apiClient.get<FinancialRecord>(`/financial-records/${id}`);
    return response.data;
  },

  // Get statistics
  getStatistics: async (): Promise<FinancialRecordStatistics> => {
    const response = await apiClient.get<FinancialRecordStatistics>('/financial-records/statistics');
    return response.data;
  },

  // Export records
  exportRecords: async (format: 'csv' | 'json', params: FinancialRecordListRequest = {}): Promise<void> => {
    const response = await apiClient.get('/financial-records/export', {
      params: {
        format,
        startDate: params.startDate,
        endDate: params.endDate,
        minAmount: params.minAmount,
        maxAmount: params.maxAmount,
        merchant: params.merchant,
        currency: params.currency,
        sourceBank: params.sourceBank,
        transactionType: params.transactionType,
        sortBy: params.sortBy || 'transactionDate',
        sortDirection: params.sortDirection || 'desc',
      },
      responseType: 'blob',
    });

    // Trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Generate filename
    const date = new Date().toISOString().split('T')[0];
    const filename = `financial_records_${date}.${format}`;
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
