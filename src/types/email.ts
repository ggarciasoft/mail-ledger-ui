// Email status enum
export type EmailStatus = 'Pending' | 'Classified' | 'Extracted' | 'Failed';

// Email entity
export interface Email {
  id: string;
  gmailMessageId: string;
  subject: string;
  sender: string;
  receivedAt: string;
  status: EmailStatus;
  classificationResult?: string;
  errorMessage?: string | null;
  processedAt?: string | null;
  createdAt: string;
}

// Email list request
export interface EmailListRequest {
  page?: number;
  pageSize?: number;
  status?: EmailStatus;
  search?: string;
  sortBy?: 'receivedAt' | 'status';
  sortDirection?: 'asc' | 'desc';
}

// Email list response
export interface EmailListResponse {
  emails: Email[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Email statistics
export interface EmailStatistics {
  totalEmails: number;
  pendingCount: number;
  classifiedCount: number;
  extractedCount: number;
  failedCount: number;
}
