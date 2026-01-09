import { useQuery } from '@tanstack/react-query';
import { financialRecordApi } from '../lib/financial-record-api';
import type { FinancialRecordListRequest } from '../types/financial-record';
import { useState } from 'react';

export const useFinancialRecords = (initialParams: FinancialRecordListRequest = {}) => {
  const [params, setParams] = useState<FinancialRecordListRequest>({
    page: 1,
    pageSize: 20,
    sortBy: 'transactionDate',
    sortDirection: 'desc',
    ...initialParams,
  });

  const query = useQuery({
    queryKey: ['financial-records', params],
    queryFn: () => financialRecordApi.getRecords(params),
  });

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setFilters = (filters: Partial<FinancialRecordListRequest>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const setSorting = (
    sortBy: 'transactionDate' | 'amount' | 'merchantName',
    sortDirection: 'asc' | 'desc'
  ) => {
    setParams((prev) => ({ ...prev, sortBy, sortDirection }));
  };

  return {
    ...query,
    params,
    setPage,
    setFilters,
    setSorting,
  };
};

export const useRecordById = (id: string | null) => {
  return useQuery({
    queryKey: ['financial-record', id],
    queryFn: () => financialRecordApi.getRecordById(id!),
    enabled: !!id,
  });
};

export const useRecordStatistics = () => {
  return useQuery({
    queryKey: ['financial-records', 'statistics'],
    queryFn: financialRecordApi.getStatistics,
  });
};
