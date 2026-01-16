import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSubscriptionPlans,
  getMySubscription,
  getSubscriptionUsage,
  upgradeSubscription,
  cancelSubscription,
} from '../lib/subscription-api';
import type {
  UpgradeSubscriptionRequest,
  CancelSubscriptionRequest,
} from '../types/subscription';

/**
 * Hook to fetch all subscription plans
 */
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: getSubscriptionPlans,
    staleTime: 1000 * 60 * 60, // 1 hour - plans don't change often
  });
}

/**
 * Hook to fetch current user's subscription
 */
export function useMySubscription() {
  return useQuery({
    queryKey: ['my-subscription'],
    queryFn: getMySubscription,
  });
}

/**
 * Hook to fetch subscription usage statistics
 */
export function useSubscriptionUsage() {
  return useQuery({
    queryKey: ['subscription-usage'],
    queryFn: getSubscriptionUsage,
    refetchInterval: 30000, // Refetch every 30 seconds to keep usage stats fresh
  });
}

/**
 * Hook to upgrade subscription
 */
export function useUpgradeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpgradeSubscriptionRequest) =>
      upgradeSubscription(request),
    onSuccess: () => {
      // Invalidate and refetch subscription data
      queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
    },
  });
}

/**
 * Hook to cancel subscription
 */
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CancelSubscriptionRequest) =>
      cancelSubscription(request),
    onSuccess: () => {
      // Invalidate and refetch subscription data
      queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
    },
  });
}
