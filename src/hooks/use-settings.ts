import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../lib/settings-api';
import type { CreateApiKeyRequest } from '../types/settings';

export const useApiKeys = () => {
  return useQuery({
    queryKey: ['api-keys'],
    queryFn: settingsApi.getApiKeys,
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApiKeyRequest) => settingsApi.createApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    },
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => settingsApi.deleteApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    },
  });
};

export const useGmailConnectionStatus = () => {
  return useQuery({
    queryKey: ['gmail', 'status'],
    queryFn: settingsApi.getGmailConnectionStatus,
  });
};

export const useTriggerGmailSync = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => settingsApi.triggerGmailSync(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gmail'] });
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
  });
};

export const useGmailSyncHistory = () => {
  return useQuery({
    queryKey: ['gmail', 'sync-history'],
    queryFn: settingsApi.getGmailSyncHistory,
  });
};
