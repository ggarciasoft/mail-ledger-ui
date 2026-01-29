import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getWebhookEndpoints,
    createWebhookEndpoint,
    updateWebhookEndpoint,
    deleteWebhookEndpoint,
    toggleWebhookEndpoint,
    getWebhookDeliveries,
} from '../lib/webhook-api';
import type {
    CreateWebhookEndpointRequest,
    UpdateWebhookEndpointRequest,
    WebhookDeliveryFilters,
} from '../types/webhook';

export function useWebhookEndpoints() {
    return useQuery({
        queryKey: ['webhooks'],
        queryFn: getWebhookEndpoints,
    });
}

export function useWebhookDeliveries(
    endpointId: string | null,
    filters?: WebhookDeliveryFilters
) {
    return useQuery({
        queryKey: ['webhook-deliveries', endpointId, filters],
        queryFn: () => getWebhookDeliveries(endpointId!, filters),
        enabled: !!endpointId,
    });
}

export function useCreateWebhookEndpoint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateWebhookEndpointRequest) =>
            createWebhookEndpoint(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
}

export function useUpdateWebhookEndpoint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            request,
        }: {
            id: string;
            request: UpdateWebhookEndpointRequest;
        }) => updateWebhookEndpoint(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
}

export function useDeleteWebhookEndpoint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteWebhookEndpoint(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
}

export function useToggleWebhookEndpoint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            toggleWebhookEndpoint(id, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
}
