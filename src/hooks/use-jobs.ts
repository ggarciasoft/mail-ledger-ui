import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as jobsApi from '../lib/jobs-api';
import type { JobType } from '../types/processing-job';

/**
 * Hook to get all jobs
 */
export function useJobs(jobType?: JobType) {
  return useQuery({
    queryKey: ['jobs', jobType],
    queryFn: () => jobsApi.getJobs(jobType),
  });
}

/**
 * Hook to get a specific job.
 * Updates are pushed via SignalR, no polling needed.
 */
export function useJob(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => jobsApi.getJobById(id!),
    enabled: enabled && !!id,
    // Removed refetchInterval - now using SignalR for real-time updates
  });
}

/**
 * Hook to get active jobs.
 * Updates are pushed via SignalR, no polling needed.
 */
export function useActiveJobs(jobType?: JobType) {
  return useQuery({
    queryKey: ['jobs', 'active', jobType],
    queryFn: () => jobsApi.getActiveJobs(jobType),
    // Removed refetchInterval - now using SignalR for real-time updates
  });
}

/**
 * Hook to cancel a job
 */
export function useCancelJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsApi.cancelJob,
    onSuccess: () => {
      // Invalidate all job queries
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
