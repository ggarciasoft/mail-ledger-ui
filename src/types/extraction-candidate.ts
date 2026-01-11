// Extraction Candidate entity
export interface ExtractionCandidate {
  id: string;
  emailId: string;
  emailMessageId: string;
  emailFrom: string;
  emailReceivedAt: string;
  emailSubject: string;
  
  // Core transaction data
  amount: number;
  currency: string;
  merchant: string;
  transactionDate: string;
  
  // Account information
  sourceAccount?: string | null;
  targetAccount?: string | null;
  sourceBank?: string | null;
  targetBank?: string | null;
  
  // Additional details
  fees?: number | null;
  tax?: number | null;
  referenceId?: string | null;
  
  // Confidence scores
  confidence: number; // Overall confidence
  amountConfidence?: number | null;
  dateConfidence?: number | null;
  merchantConfidence?: number | null;
  
  // Status
  status: 'Pending' | 'Confirmed' | 'Rejected';
  createdAt: string;
  confirmedAt?: string | null;
  rejectionReason?: string | null;
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
  merchant?: string;
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
