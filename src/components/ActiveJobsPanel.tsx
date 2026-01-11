import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useActiveJobs, useCancelJob } from '../hooks/use-jobs';
import JobStatusBadge from './JobStatusBadge';
import JobProgressBar from './JobProgressBar';
import type { JobType } from '../types/processing-job';

export default function ActiveJobsPanel() {
    const [isMinimized, setIsMinimized] = useState(false);
    const { data: jobs = [], isLoading } = useActiveJobs();
    const cancelJob = useCancelJob();

    // Don't show panel if no active jobs
    if (!isLoading && jobs.length === 0) {
        return null;
    }

    const getJobTypeLabel = (type: JobType) => {
        switch (type) {
            case 'EmailSync':
                return 'Email Sync';
            case 'Classification':
                return 'Classification';
            case 'Extraction':
                return 'Extraction';
        }
    };

    const handleCancel = (jobId: string) => {
        if (confirm('Are you sure you want to cancel this job?')) {
            cancelJob.mutate(jobId);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold text-gray-900">
                        Active Jobs ({jobs.length})
                    </h3>
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMinimized(!isMinimized);
                    }}
                >
                    {isMinimized ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Job list */}
            {!isMinimized && (
                <div className="max-h-96 overflow-y-auto">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                        >
                            {/* Job header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm text-gray-900">
                                            {getJobTypeLabel(job.jobType)}
                                        </span>
                                        <JobStatusBadge status={job.status} />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Started {new Date(job.startedAt || job.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>

                                {/* Cancel button */}
                                {(job.status === 'Pending' || job.status === 'Running') && (
                                    <button
                                        onClick={() => handleCancel(job.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                        title="Cancel job"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Progress bar */}
                            <JobProgressBar
                                progress={job.progress}
                                processedItems={job.processedItems}
                                totalItems={job.totalItems}
                                successCount={job.successCount}
                                failureCount={job.failureCount}
                            />

                            {/* Error message */}
                            {job.errorMessage && (
                                <p className="mt-2 text-xs text-red-600">{job.errorMessage}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
