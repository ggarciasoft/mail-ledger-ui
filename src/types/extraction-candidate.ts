// Extraction Candidate entity
export interface ExtractionCandidate {
  id: string;
  emailId: string;
  emailMessageId: string;
  sourceBank?: string;
  transactionDate: string;
  amount: number;
  currency: string;
  merchant: string;
  confidence: number;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  rejectionReason?: string | null;
  confirmedAt?: string | null;
  rejectedAt?: string | null;
  createdAt: string;
  
  emailFrom: string;
  emailReceivedAt: string;
  emailSubject: string;
}

// List request
export interface ExtractionCandidateListRequest {
  page?: number;
  pageSize?: number;
  minConfidence?: number;
  maxConfidence?: number;
  status?: 'Pending' | 'Confirmed' | 'Rejected';
  sortBy?: 'createdAt' | 'confidence';
  sortDirection?: 'asc' | 'desc';
}

// List response
export interface ExtractionCandidateListResponse {
  items: ExtractionCandidate[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Confirm request (financial data)
export interface ConfirmCandidateRequest {
  transactionDate: string;
  amount: number;
  currency: string;
  merchant: string;
  sourceBank?: string;
}

// Reject request
export interface RejectCandidateRequest {
  reason: string;
}

// Bulk confirm request
export interface BulkConfirmRequest {
  candidateIds: string[];
}

// Bulk reject request
export interface BulkRejectRequest {
  candidateIds: string[];
  reason?: string;
}

// Bulk operation response
export interface BulkOperationResponse {
  totalRequested: number;
  succeeded: number;
  failed: number;
  errors: BulkOperationError[];
}

// Bulk operation error
export interface BulkOperationError {
  candidateId: string;
  error: string;
}
