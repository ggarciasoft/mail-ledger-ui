import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession } from '../lib/stripe-api';
import type { CreateCheckoutSessionRequest } from '../types/subscription';

/**
 * Hook for creating a Stripe Checkout session.
 */
export function useCreateCheckoutSession() {
    return useMutation({
        mutationFn: (request: CreateCheckoutSessionRequest) =>
            createCheckoutSession(request),
        onSuccess: (data) => {
            // Redirect to Stripe Checkout
            window.location.href = data.checkoutUrl;
        },
    });
}
