import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { signalRService } from '../lib/signalr-service';
import { useAuthStore } from '../store/auth-store';
import type { ProcessingJob } from '../types/processing-job';

/**
 * Transform backend JobDto to frontend ProcessingJob type.
 * Backend uses 'jobId' while frontend uses 'id'.
 */
function transformJobDto(dto: any): ProcessingJob {
    return {
        id: dto.jobId,
        jobType: dto.jobType,
        status: dto.status,
        progress: dto.progress,
        totalItems: dto.totalItems,
        processedItems: dto.processedItems,
        successCount: dto.successCount,
        failureCount: dto.failureCount,
        errorMessage: dto.errorMessage,
        createdAt: dto.createdAt,
        startedAt: dto.startedAt,
        completedAt: dto.completedAt,
    };
}

/**
 * Hook to manage SignalR connection for real-time job updates.
 * Automatically connects when user is authenticated and disconnects on unmount.
 */
export function useSignalRJobs() {
    const queryClient = useQueryClient();
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        if (!user || !token) {
            console.log('SignalR: No user or token, skipping connection');
            return;
        }

        const abortController = new AbortController();
        let unsubscribeUpdated: (() => void) | undefined;
        let unsubscribeCompleted: (() => void) | undefined;
        let unsubscribeFailed: (() => void) | undefined;

        // Connect to SignalR
        const connectSignalR = async () => {
            try {
                await signalRService.connect(user.id, token, abortController.signal);

                if (abortController.signal.aborted) {
                    console.log('SignalR: Component unmounted during connection, skipping subscription');
                    return;
                }

                // Subscribe to job updates
                unsubscribeUpdated = signalRService.subscribe(
                    'JobUpdated',
                    (jobDto: any) => {
                        const job = transformJobDto(jobDto);
                        console.log('Received JobUpdated event:', job);

                        // Update React Query cache for jobs list
                        queryClient.setQueryData(['jobs'], (old: ProcessingJob[] | undefined) => {
                            if (!old) return [job];
                            const exists = old.some((j) => j.id === job.id);
                            if (exists) {
                                return old.map((j) => (j.id === job.id ? job : j));
                            }
                            return [job, ...old];
                        });

                        // Update React Query cache for individual job
                        queryClient.setQueryData(['job', job.id], job);

                        // Update active jobs cache
                        queryClient.setQueryData(
                            ['jobs', 'active'],
                            (old: ProcessingJob[] | undefined) => {
                                if (!old) return [job];
                                const exists = old.some((j) => j.id === job.id);
                                if (exists) {
                                    return old.map((j) => (j.id === job.id ? job : j));
                                }
                                return [job, ...old];
                            }
                        );

                        // Invalidate all active jobs query variants
                        queryClient.invalidateQueries({ 
                            queryKey: ['jobs', 'active'],
                            exact: false,
                            refetchType: 'active'
                        });
                    }
                );

                unsubscribeCompleted = signalRService.subscribe(
                    'JobCompleted',
                    (jobDto: any) => {
                        const job = transformJobDto(jobDto);
                        console.log('Received JobCompleted event:', job);
                        console.log('Updating cache for job:', job.id);

                        // Update React Query cache
                        queryClient.setQueryData(['jobs'], (old: ProcessingJob[] | undefined) => {
                            console.log('Updating jobs cache, old:', old);
                            if (!old) return [job];
                            return old.map((j) => (j.id === job.id ? job : j));
                        });

                        queryClient.setQueryData(['job', job.id], job);

                        // Remove from active jobs - need to invalidate all variants
                        queryClient.setQueryData(
                            ['jobs', 'active'],
                            (old: ProcessingJob[] | undefined) => {
                                console.log('Updating active jobs cache (no type), old:', old);
                                if (!old) return [];
                                return old.filter((j) => j.id !== job.id);
                            }
                        );

                        // Also invalidate active jobs with jobType parameter
                        queryClient.invalidateQueries({ 
                            queryKey: ['jobs', 'active'],
                            exact: false, // This will invalidate all variants like ['jobs', 'active', 'EmailSync']
                            refetchType: 'active' // Only refetch queries that are currently being observed
                        });

                        // Invalidate related queries to refresh data
                        queryClient.invalidateQueries({ queryKey: ['processing-status'] });
                        queryClient.invalidateQueries({ queryKey: ['processing', 'status'] });
                        queryClient.invalidateQueries({ queryKey: ['emails'] });
                        queryClient.invalidateQueries({ queryKey: ['extraction-candidates'] });
                        queryClient.invalidateQueries({ queryKey: ['jobs'] }); // Invalidate all job queries
                    }
                );

                unsubscribeFailed = signalRService.subscribe(
                    'JobFailed',
                    (jobDto: any) => {
                        const job = transformJobDto(jobDto);
                        console.log('Received JobFailed event:', job);

                        // Update React Query cache
                        queryClient.setQueryData(['jobs'], (old: ProcessingJob[] | undefined) => {
                            if (!old) return [job];
                            return old.map((j) => (j.id === job.id ? job : j));
                        });

                        queryClient.setQueryData(['job', job.id], job);

                        // Remove from active jobs
                        queryClient.setQueryData(
                            ['jobs', 'active'],
                            (old: ProcessingJob[] | undefined) => {
                                if (!old) return [];
                                return old.filter((j) => j.id !== job.id);
                            }
                        );
                    }
                );
            } catch (error) {
                console.error('Failed to connect to SignalR:', error);
            }
        };

        connectSignalR();

        // Cleanup function
        return () => {
            console.log('SignalR: Cleaning up connection');
            abortController.abort();

            // Unsubscribe from events
            if (unsubscribeUpdated) unsubscribeUpdated();
            if (unsubscribeCompleted) unsubscribeCompleted();
            if (unsubscribeFailed) unsubscribeFailed();

            // Disconnect
            signalRService.disconnect(user.id).catch((err) => {
                console.error('Error during SignalR cleanup:', err);
            });
        };
    }, [user, token, queryClient]);
}
