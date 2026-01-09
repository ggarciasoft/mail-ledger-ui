// Extraction Candidate entity
export interface ExtractionCandidate {
  id: string;
  emailId: string;
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

// Reject request
export interface RejectCandidateRequest {
  reason: string;
}
