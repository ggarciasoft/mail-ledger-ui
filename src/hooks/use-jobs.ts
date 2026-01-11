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
 * Hook to get a specific job with auto-refresh
 */
export function useJob(id: string | null, enabled = true) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => jobsApi.getJobById(id!),
    enabled: enabled && !!id,
    refetchInterval: (query) => {
      // Auto-refresh every 2 seconds if job is pending or running
      const data = query.state.data;
      if (data?.status === 'Pending' || data?.status === 'Running') {
        return 2000;
      }
      return false;
    },
  });
}

/**
 * Hook to get active jobs with auto-refresh
 */
export function useActiveJobs(jobType?: JobType) {
  return useQuery({
    queryKey: ['jobs', 'active', jobType],
    queryFn: () => jobsApi.getActiveJobs(jobType),
    refetchInterval: 2000, // Refresh every 2 seconds
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
