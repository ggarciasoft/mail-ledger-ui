// Extraction Candidate entity
export interface ExtractionCandidate {
  id: string;
  emailId: string;
  extractedData: ExtractedFinancialData;
  confidence: number;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  rejectionReason?: string | null;
  confirmedAt?: string | null;
  rejectedAt?: string | null;
  createdAt: string;
  
  // Related email data
  email?: {
    subject: string;
    sender: string;
    receivedAt: string;
  };
}

// Extracted financial data
export interface ExtractedFinancialData {
  transactionDate: string;
  amount: number;
  currency: string;
  merchantName: string;
  category?: string;
  description?: string;
  sourceBank?: string;
  transactionType?: string;
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
  candidates: ExtractionCandidate[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Confirm request
export interface ConfirmCandidateRequest {
  extractedData: ExtractedFinancialData;
}

// Reject request
export interface RejectCandidateRequest {
  reason: string;
}
