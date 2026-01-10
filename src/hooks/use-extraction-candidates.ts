import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { extractionCandidateApi } from '../lib/extraction-candidate-api';
import type { ExtractionCandidateListRequest, ConfirmCandidateRequest, RejectCandidateRequest } from '../types/extraction-candidate';
import { useState } from 'react';

export const useExtractionCandidates = (initialParams: ExtractionCandidateListRequest = {}) => {
  const [params, setParams] = useState<ExtractionCandidateListRequest>({
    page: 1,
    pageSize: 20,
    sortBy: 'createdAt',
    sortDirection: 'desc',
    ...initialParams,
  });

  const query = useQuery({
    queryKey: ['extraction-candidates', params],
    queryFn: () => extractionCandidateApi.getCandidates(params),
  });

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setConfidenceRange = (min?: number, max?: number) => {
    setParams((prev) => ({ ...prev, minConfidence: min, maxConfidence: max, page: 1 }));
  };

  return {
    ...query,
    params,
    setPage,
    setConfidenceRange,
  };
};

export const useCandidateById = (id: string | null) => {
  return useQuery({
    queryKey: ['extraction-candidate', id],
    queryFn: () => extractionCandidateApi.getCandidateById(id!),
    enabled: !!id,
  });
};

export const useConfirmCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ConfirmCandidateRequest }) =>
      extractionCandidateApi.confirmCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useRejectCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectCandidateRequest }) =>
      extractionCandidateApi.rejectCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ConfirmCandidateRequest }) =>
      extractionCandidateApi.updateCandidate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['extraction-candidate', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
    },
  });
};

// Bulk confirm candidates
export const useBulkConfirmCandidates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (candidateIds: string[]) =>
      extractionCandidateApi.bulkConfirmCandidates(candidateIds),
    onSuccess: (data) => {
      // Invalidate candidates list
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });

      // Show success message
      const message = `${data.succeeded} candidates confirmed${
        data.failed > 0 ? `, ${data.failed} failed` : ''
      }`;
      console.log(message);

      // Log errors if any
      if (data.errors.length > 0) {
        data.errors.forEach(err => {
          console.error(`Failed to confirm ${err.candidateId}: ${err.error}`);
        });
      }
    },
    onError: (error) => {
      console.error('Failed to confirm candidates:', error);
    }
  });
};

// Bulk reject candidates
export const useBulkRejectCandidates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ candidateIds, reason }: { candidateIds: string[]; reason?: string }) =>
      extractionCandidateApi.bulkRejectCandidates(candidateIds, reason),
    onSuccess: (data) => {
      // Invalidate candidates list
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });

      // Show success message
      const message = `${data.succeeded} candidates rejected${
        data.failed > 0 ? `, ${data.failed} failed` : ''
      }`;
      console.log(message);

      // Log errors if any
      if (data.errors.length > 0) {
        data.errors.forEach(err => {
          console.error(`Failed to reject ${err.candidateId}: ${err.error}`);
        });
      }
    },
    onError: (error) => {
      console.error('Failed to reject candidates:', error);
    }
  });
};
