export const SubscriptionTier = {
  Free: 'Free',
  Basic: 'Basic',
  Pro: 'Pro',
  Enterprise: 'Enterprise',
} as const;

export type SubscriptionTier = typeof SubscriptionTier[keyof typeof SubscriptionTier];

export const SubscriptionStatus = {
  Active: 'Active',
  Cancelled: 'Cancelled',
  Expired: 'Expired',
  PastDue: 'PastDue',
  Trialing: 'Trialing',
} as const;

export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  monthlyEmailLimit: number;
  maxEmailAccounts: number;
  maxApiKeys: number;
  historyRetentionDays: number;
  canExport: boolean;
  canUseWorkflowAutomation: boolean;
  canUseWebhooks: boolean;
  maxWebhooks: number;
  canUseBulkOperations: boolean;
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  subscriptionPlan: SubscriptionPlan;
  startDate: string;
  endDate: string | null;
  status: SubscriptionStatus;
  emailsProcessedThisMonth: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

export interface SubscriptionUsage {
  emailsProcessed: number;
  emailLimit: number;
  emailAccountsConnected: number;
  emailAccountsLimit: number;
  apiKeysCreated: number;
  apiKeysLimit: number;
}

export interface UpgradeSubscriptionRequest {
  planId: string;
}

export interface CancelSubscriptionRequest {
  reason: string;
}
