import { useState } from 'react';
import { Check, X, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { useMySubscription, useSubscriptionUsage, useSubscriptionPlans, useCancelSubscription } from '../hooks/use-subscription';
import { useCreateCheckoutSession } from '../hooks/use-stripe';
import { SubscriptionBadge } from '../components/SubscriptionBadge';
import { UsageProgress } from '../components/UsageProgress';
import { SubscriptionTier } from '../types/subscription';

export function SubscriptionPage() {
    const { data: subscription, isLoading: subscriptionLoading } = useMySubscription();
    const { data: usage, isLoading: usageLoading } = useSubscriptionUsage();
    const { data: plans, isLoading: plansLoading } = useSubscriptionPlans();
    const checkoutMutation = useCreateCheckoutSession();
    const cancelMutation = useCancelSubscription();

    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const handleUpgrade = (planId: string) => {
        // Redirect to Stripe Checkout
        checkoutMutation.mutate({ planId });
    };

    const handleCancel = () => {
        if (!cancelReason.trim()) {
            alert('Please provide a reason for cancellation');
            return;
        }
        cancelMutation.mutate(
            { reason: cancelReason },
            {
                onSuccess: () => {
                    setShowCancelDialog(false);
                    setCancelReason('');
                },
            }
        );
    };

    if (subscriptionLoading || usageLoading || plansLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!subscription || !usage || !plans) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">Failed to load subscription information.</p>
                </div>
            </div>
        );
    }

    const currentPlan = subscription.subscriptionPlan;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
                <p className="text-gray-600 mt-2">Manage your subscription and view usage</p>
            </div>

            {/* Current Subscription Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                            <SubscriptionBadge tier={currentPlan.name} />
                        </div>
                        <p className="text-gray-600">{currentPlan.description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                            ${currentPlan.monthlyPrice}
                            <span className="text-lg text-gray-600 font-normal">/month</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Usage This Month
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <UsageProgress
                            label="Classifications"
                            current={usage.emailsClassified}
                            limit={usage.classificationLimit}
                        />
                        <UsageProgress
                            label="Extractions"
                            current={usage.emailsExtracted}
                            limit={usage.extractionLimit}
                        />
                        <UsageProgress
                            label="Email Accounts"
                            current={usage.emailAccountsConnected}
                            limit={usage.emailAccountsLimit}
                        />
                        <UsageProgress
                            label="API Keys"
                            current={usage.apiKeysCreated}
                            limit={usage.apiKeysLimit}
                        />
                        <UsageProgress
                            label="Webhooks"
                            current={usage.webhooksCreated}
                            limit={usage.webhooksLimit}
                        />
                    </div>
                </div>

                {/* Subscription Status */}
                {subscription.status === 'Cancelled' && subscription.endDate && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-yellow-900">Subscription Cancelled</p>
                            <p className="text-sm text-yellow-700 mt-1">
                                Your subscription will end on {new Date(subscription.endDate).toLocaleDateString()}.
                                You will retain access until then.
                            </p>
                        </div>
                    </div>
                )}

                {/* Cancel Button */}
                {subscription.status === 'Active' && currentPlan.name !== SubscriptionTier.Free && (
                    <button
                        onClick={() => setShowCancelDialog(true)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                    >
                        Cancel Subscription
                    </button>
                )}
            </div>

            {/* Available Plans */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => {
                        const isCurrentPlan = plan.id === currentPlan.id;
                        const isUpgrade = plan.monthlyPrice > currentPlan.monthlyPrice;

                        return (
                            <div
                                key={plan.id}
                                className={`bg-white rounded-lg shadow-md border-2 p-6 flex flex-col ${isCurrentPlan
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-blue-300'
                                    } transition-all`}
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                                    <div className="text-3xl font-bold text-gray-900">
                                        ${plan.monthlyPrice}
                                        <span className="text-sm text-gray-600 font-normal">/mo</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>
                                            {plan.classificationLimit === -1 || plan.classificationLimit === Number.MAX_SAFE_INTEGER
                                                ? 'Unlimited'
                                                : plan.classificationLimit.toLocaleString()}{' '}
                                            classifications/month
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>
                                            {plan.extractionLimit === -1 || plan.extractionLimit === Number.MAX_SAFE_INTEGER
                                                ? 'Unlimited'
                                                : plan.extractionLimit.toLocaleString()}{' '}
                                            extractions/month
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        {plan.maxEmailAccounts > 0 ? (
                                            <>
                                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                                <span>
                                                    {plan.maxEmailAccounts === -1 || plan.maxEmailAccounts === Number.MAX_SAFE_INTEGER
                                                        ? 'Unlimited'
                                                        : plan.maxEmailAccounts}{' '}
                                                    email account{plan.maxEmailAccounts !== 1 ? 's' : ''}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-500">No email accounts</span>
                                            </>
                                        )}
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        {plan.canUseWorkflowAutomation ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>Workflow automation</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-500">No automation</span>
                                            </>
                                        )}
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        {plan.canUseBulkOperations ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>Bulk operations</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-500">No bulk operations</span>
                                            </>
                                        )}
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        {plan.canExport ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>Data export</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-500">No export</span>
                                            </>
                                        )}
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        {plan.canUseWebhooks && plan.maxWebhooks > 0 ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>
                                                    {plan.maxWebhooks === -1 || plan.maxWebhooks === Number.MAX_SAFE_INTEGER
                                                        ? 'Unlimited'
                                                        : plan.maxWebhooks}{' '}
                                                    webhook{plan.maxWebhooks !== 1 ? 's' : ''}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-500">No webhooks</span>
                                            </>
                                        )}
                                    </li>
                                </ul>

                                {/* Separator */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Button - will be pushed to bottom by flex */}
                                <div className="mt-auto">

                                    {isCurrentPlan ? (
                                        <button
                                            disabled
                                            className="w-full py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                                        >
                                            Current Plan
                                        </button>
                                    ) : isUpgrade ? (
                                        <button
                                            onClick={() => handleUpgrade(plan.id)}
                                            disabled={checkoutMutation.isPending}
                                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            Upgrade
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                                        >
                                            Downgrade Not Available
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Coming Soon Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                <ArrowRight className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">More Plans Coming Soon</h3>
                            <p className="text-sm text-gray-600">
                                We're working on additional subscription tiers to better fit your needs.
                            </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-auto">
                            Stay tuned for updates!
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Dialog */}
            {showCancelDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Subscription</h3>
                        <p className="text-gray-600 mb-4">
                            We're sorry to see you go. Please let us know why you're cancelling:
                        </p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Your feedback helps us improve..."
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelDialog(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                            >
                                Keep Subscription
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                            >
                                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Subscription'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
