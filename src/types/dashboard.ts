// Dashboard API Types
export interface DashboardOverview {
  totalEmails: number;
  processedEmails: number;
  pendingCandidates: number;
  confirmedRecords: number;
  totalSpending: number;
  averageTransactionAmount: number;
  lastSyncTime: string | null;
}

export interface SpendingTrend {
  date: string;
  amount: number;
  count: number;
}

export interface SpendingTrendsResponse {
  trends: SpendingTrend[];
  period: 'week' | 'month' | 'year';
}

export interface TopMerchant {
  merchantName: string;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}

export interface TopMerchantsResponse {
  merchants: TopMerchant[];
  period: 'week' | 'month' | 'year';
}
