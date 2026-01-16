import apiClient from './api-client';
import type {
  SubscriptionPlan,
  UserSubscription,
  SubscriptionUsage,
  UpgradeSubscriptionRequest,
  CancelSubscriptionRequest,
} from '../types/subscription';

/**
 * Get all available subscription plans
 */
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const response = await apiClient.get('/subscriptions/plans');
  return response.data;
};

/**
 * Get current user's subscription
 */
export const getMySubscription = async (): Promise<UserSubscription> => {
  const response = await apiClient.get('/subscriptions/my-subscription');
  return response.data;
};

/**
 * Get current user's subscription usage statistics
 */
export const getSubscriptionUsage = async (): Promise<SubscriptionUsage> => {
  const response = await apiClient.get('/subscriptions/usage');
  return response.data;
};

/**
 * Upgrade to a new subscription plan
 */
export const upgradeSubscription = async (
  request: UpgradeSubscriptionRequest
): Promise<void> => {
  await apiClient.post('/subscriptions/upgrade', request);
};

/**
 * Cancel current subscription
 */
export const cancelSubscription = async (
  request: CancelSubscriptionRequest
): Promise<void> => {
  await apiClient.post('/subscriptions/cancel', request);
};
