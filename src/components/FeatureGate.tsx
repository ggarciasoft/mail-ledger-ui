import { type ReactNode } from 'react';
import { useMySubscription } from '../hooks/use-subscription';
import { UpgradePrompt } from './UpgradePrompt';

interface FeatureGateProps {
    feature: 'export' | 'workflow' | 'apiKeys' | 'bulkOps' | 'webhooks';
    children: ReactNode;
    fallback?: ReactNode;
    showUpgradePrompt?: boolean;
}

export function FeatureGate({
    feature,
    children,
    fallback,
    showUpgradePrompt = true,
}: FeatureGateProps) {
    const { data: subscription, isLoading } = useMySubscription();

    if (isLoading) {
        return null;
    }

    if (!subscription) {
        return null;
    }

    const plan = subscription.subscriptionPlan;
    let hasAccess = false;
    let featureName = '';

    switch (feature) {
        case 'export':
            hasAccess = plan.canExport;
            featureName = 'Data Export';
            break;
        case 'workflow':
            hasAccess = plan.canUseWorkflowAutomation;
            featureName = 'Workflow Automation';
            break;
        case 'apiKeys':
            hasAccess = plan.maxApiKeys > 0;
            featureName = 'API Keys';
            break;
        case 'bulkOps':
            hasAccess = plan.canUseBulkOperations;
            featureName = 'Bulk Operations';
            break;
        case 'webhooks':
            hasAccess = plan.canUseWebhooks;
            featureName = 'Webhooks';
            break;
    }

    if (hasAccess) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    if (showUpgradePrompt) {
        return <UpgradePrompt feature={featureName} />;
    }

    return null;
}
