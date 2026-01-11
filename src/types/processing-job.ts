export type JobType = 'EmailSync' | 'Classification' | 'Extraction';
export type JobStatus = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';

export interface ProcessingJob {
  id: string;
  jobType: JobType;
  status: JobStatus;
  progress: number;
  totalItems: number;
  processedItems: number;
  successCount: number;
  failureCount: number;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  metadata?: string;
}
