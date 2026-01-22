import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { processingApi } from '../lib/processing-api';
import type { TriggerClassificationRequest, TriggerExtractionRequest } from '../types/processing';

export const useProcessingStatus = (refetchInterval?: number | false) => {
  return useQuery({
    queryKey: ['processing', 'status'],
    queryFn: processingApi.getStatus,
    refetchInterval: refetchInterval || false,
  });
};

export function useTriggerClassification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TriggerClassificationRequest) =>
      processingApi.triggerClassification(request),
    onSuccess: () => {
      // Invalidate processing status and subscription usage to reflect updated counts
      queryClient.invalidateQueries({ queryKey: ['processing-status'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'active'] });
    },
  });
};

export function useTriggerExtraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TriggerExtractionRequest) =>
      processingApi.triggerExtraction(request),
    onSuccess: () => {
      // Invalidate processing status and subscription usage to reflect updated counts
      queryClient.invalidateQueries({ queryKey: ['processing-status'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'active'] });
    },
  });
};
