// Dashboard API Types
export interface DashboardOverview {
  totalEmails: number;
  processedEmails: number;
  pendingCandidates: number;
  confirmedRecords: number;
  totalSpending: number;
  avgTransaction: number;
  lastSyncAt: string | null;
}

export interface SpendingTrend {
  date: string;
  totalSpent: number;
  transactionCount: number;
}

export interface SpendingTrendsResponse {
  data: SpendingTrend[];
}

export interface TopMerchant {
  name: string;
  totalSpent: number;
  transactionCount: number;
  percentage: number;
}

export interface TopMerchantsResponse {
  merchants: TopMerchant[];
}
