import apiClient from './api-client';
import type { ProcessingJob, JobType } from '../types/processing-job';

/**
 * Get all jobs for the current user
 */
export async function getJobs(jobType?: JobType): Promise<ProcessingJob[]> {
  const params = jobType ? { jobType } : {};
  const response = await apiClient.get<ProcessingJob[]>('/jobs', { params });
  return response.data;
}

/**
 * Get a specific job by ID
 */
export async function getJobById(id: string): Promise<ProcessingJob> {
  const response = await apiClient.get<ProcessingJob>(`/jobs/${id}`);
  return response.data;
}

/**
 * Get active jobs for the current user
 */
export async function getActiveJobs(jobType?: JobType): Promise<ProcessingJob[]> {
  const params = jobType ? { jobType } : {};
  const response = await apiClient.get<ProcessingJob[]>('/jobs/active', { params });
  return response.data;
}

/**
 * Cancel a job
 */
export async function cancelJob(id: string): Promise<void> {
  await apiClient.delete(`/jobs/${id}`);
}
