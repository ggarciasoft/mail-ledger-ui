import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { emailApi } from '../lib/email-api';
import type { EmailListRequest, EmailStatus } from '../types/email';
import { useState } from 'react';

export const useEmails = (initialParams: EmailListRequest = {}) => {
  const [params, setParams] = useState<EmailListRequest>({
    page: 1,
    pageSize: 20,
    sortBy: 'receivedAt',
    sortDirection: 'desc',
    ...initialParams,
  });

  const query = useQuery({
    queryKey: ['emails', params],
    queryFn: () => emailApi.getEmails(params),
  });

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setStatus = (status: EmailStatus | undefined) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const setSearch = (search: string | undefined) => {
    setParams((prev) => ({ ...prev, search, page: 1 }));
  };

  const setSorting = (sortBy: 'receivedAt' | 'status', sortDirection: 'asc' | 'desc') => {
    setParams((prev) => ({ ...prev, sortBy, sortDirection }));
  };

  return {
    ...query,
    params,
    setPage,
    setStatus,
    setSearch,
    setSorting,
  };
};

export const useEmailById = (id: string | null) => {
  return useQuery({
    queryKey: ['email', id],
    queryFn: () => emailApi.getEmailById(id!),
    enabled: !!id,
  });
};

export const useEmailStatistics = () => {
  return useQuery({
    queryKey: ['emails', 'statistics'],
    queryFn: emailApi.getStatistics,
  });
};

export const useDeleteEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emailId: string) => emailApi.deleteEmail(emailId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emails', 'statistics'] });
    },
  });
};

export const useBulkDeleteEmails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emailIds: string[]) => emailApi.bulkDeleteEmails(emailIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      queryClient.invalidateQueries({ queryKey: ['emails', 'statistics'] });
    },
  });
};
