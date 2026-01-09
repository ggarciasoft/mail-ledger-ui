// Financial Record entity
export interface FinancialRecord {
  id: string;
  extractionCandidateId: string;
  emailId: string;
  transactionDate: string;
  amount: number;
  currency: string;
  merchant: string;
  category?: string;
  description?: string;
  sourceBank?: string;
  type?: string;
  confirmedAt: string;
  createdAt: string;
  
  // Related data
  email?: {
    subject: string;
    sender: string;
    receivedAt: string;
  };
}

// List request with 8 filters
export interface FinancialRecordListRequest {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  merchant?: string;
  currency?: string;
  sourceBank?: string;
  transactionType?: string;
  sortBy?: 'transactionDate' | 'amount' | 'merchant';
  sortDirection?: 'asc' | 'desc';
}

// List response
export interface FinancialRecordListResponse {
  items: FinancialRecord[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Statistics
export interface FinancialRecordStatistics {
  totalRecords: number;
  totalAmount: number;
  averageAmount: number;
  uniqueMerchants: number;
  recordsByMonth: MonthlyRecord[];
}

export interface MonthlyRecord {
  month: string;
  count: number;
  totalAmount: number;
}
