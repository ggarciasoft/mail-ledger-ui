import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../lib/dashboard-api';
import { useState } from 'react';

export type Period = 'week' | 'month' | 'year';

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: dashboardApi.getOverview,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useSpendingTrends = (initialPeriod: Period = 'month') => {
  const [period, setPeriod] = useState<Period>(initialPeriod);

  const query = useQuery({
    queryKey: ['dashboard', 'spending-trends', period],
    queryFn: () => dashboardApi.getSpendingTrends(period),
  });

  return { ...query, period, setPeriod };
};

export const useTopMerchants = (initialPeriod: Period = 'month') => {
  const [period, setPeriod] = useState<Period>(initialPeriod);

  const query = useQuery({
    queryKey: ['dashboard', 'top-merchants', period],
    queryFn: () => dashboardApi.getTopMerchants(period),
  });

  return { ...query, period, setPeriod };
};
