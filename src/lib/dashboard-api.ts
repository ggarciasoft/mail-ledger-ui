import apiClient from './api-client';
import type {
  DashboardOverview,
  SpendingTrendsResponse,
  TopMerchantsResponse,
} from '../types/dashboard';

export const dashboardApi = {
  // Get dashboard overview
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get<DashboardOverview>('/dashboard/overview');
    return response.data;
  },

  // Get spending trends
  getSpendingTrends: async (period: 'week' | 'month' | 'year' = 'month'): Promise<SpendingTrendsResponse> => {
    const response = await apiClient.get<SpendingTrendsResponse>('/dashboard/spending-trends', {
      params: { period },
    });
    return response.data;
  },

  // Get top merchants
  getTopMerchants: async (period: 'week' | 'month' | 'year' = 'month'): Promise<TopMerchantsResponse> => {
    const response = await apiClient.get<TopMerchantsResponse>('/dashboard/top-merchants', {
      params: { period },
    });
    return response.data;
  },
};
