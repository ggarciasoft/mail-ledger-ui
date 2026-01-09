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

export const useTriggerClassification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TriggerClassificationRequest) => processingApi.triggerClassification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processing', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
  });
};

export const useTriggerExtraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TriggerExtractionRequest) => processingApi.triggerExtraction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processing', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
    },
  });
};
