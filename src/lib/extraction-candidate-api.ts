import apiClient from './api-client';
import type {
  ExtractionCandidate,
  ExtractionCandidateListRequest,
  ExtractionCandidateListResponse,
  ConfirmCandidateRequest,
  RejectCandidateRequest,
  BulkConfirmRequest,
  BulkRejectRequest,
  BulkOperationResponse,
} from '../types/extraction-candidate';

export const extractionCandidateApi = {
  // Get candidates list with filters and pagination
  getCandidates: async (params: ExtractionCandidateListRequest = {}): Promise<ExtractionCandidateListResponse> => {
    const response = await apiClient.get<ExtractionCandidateListResponse>('/api/extraction-candidates', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        minConfidence: params.minConfidence,
        maxConfidence: params.maxConfidence,
        status: params.status,
        sortBy: params.sortBy || 'createdAt',
        sortDirection: params.sortDirection || 'desc',
      },
    });
    return response.data;
  },

  // Get single candidate by ID
  getCandidateById: async (id: string): Promise<ExtractionCandidate> => {
    const response = await apiClient.get<ExtractionCandidate>(`/api/extraction-candidates/${id}`);
    return response.data;
  },

  // Confirm candidate
  confirmCandidate: async (id: string, data: ConfirmCandidateRequest): Promise<void> => {
    await apiClient.post(`/api/extraction-candidates/${id}/confirm`, data);
  },

  // Reject candidate
  rejectCandidate: async (id: string, data: RejectCandidateRequest): Promise<void> => {
    await apiClient.post(`/api/extraction-candidates/${id}/reject`, data);
  },

  // Update candidate
  updateCandidate: async (id: string, data: ConfirmCandidateRequest): Promise<ExtractionCandidate> => {
    const response = await apiClient.put<ExtractionCandidate>(`/api/extraction-candidates/${id}`, data);
    return response.data;
  },

  // Bulk confirm candidates
  bulkConfirmCandidates: async (candidateIds: string[]): Promise<BulkOperationResponse> => {
    const response = await apiClient.post<BulkOperationResponse>(
      '/api/extraction-candidates/bulk-confirm',
      { candidateIds } as BulkConfirmRequest
    );
    return response.data;
  },

  // Bulk reject candidates
  bulkRejectCandidates: async (candidateIds: string[], reason?: string): Promise<BulkOperationResponse> => {
    const response = await apiClient.post<BulkOperationResponse>(
      '/api/extraction-candidates/bulk-reject',
      { candidateIds, reason } as BulkRejectRequest
    );
    return response.data;
  },
};
