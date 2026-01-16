import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { emailConnectionApi } from '../lib/email-connection-api';
import type { EmailProvider, SyncEmailsRequest } from '../types/email-connection';

/**
 * Hook to get all email connections
 */
export function useEmailConnections() {
  return useQuery({
    queryKey: ['email-connections'],
    queryFn: async () => {
      const response = await emailConnectionApi.getConnections();
      return response.data;
    }
  });
}

/**
 * Hook to get OAuth authorization URL
 */
export function useGetAuthUrl() {
  return useMutation({
    mutationFn: async (provider: EmailProvider) => {
      const response = await emailConnectionApi.getAuthUrl(provider);
      return response.data;
    }
  });
}

/**
 * Hook to connect email provider
 */
export function useConnectProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ provider, code }: { provider: EmailProvider; code: string }) => {
      const response = await emailConnectionApi.connectProvider(provider, code);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-connections'] });
    }
  });
}

/**
 * Hook to sync emails from provider
 */
export function useSyncEmails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ provider, options }: { provider: EmailProvider; options?: SyncEmailsRequest }) => {
      const response = await emailConnectionApi.syncEmails(provider, options);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-connections'] });
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    }
  });
}

/**
 * Hook to disconnect email provider
 */
export function useDisconnectProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provider: EmailProvider) => {
      await emailConnectionApi.disconnect(provider);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-connections'] });
    }
  });
}
