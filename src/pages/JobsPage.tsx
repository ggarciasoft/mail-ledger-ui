import { useJobs, useCancelJob } from '../hooks/use-jobs';
import { Clock, XCircle as XIcon, Loader2, CheckCircle, AlertCircle, Ban } from 'lucide-react';
import JobStatusBadge from '../components/JobStatusBadge';
import JobProgressBar from '../components/JobProgressBar';

export default function JobsPage() {
    const { data: allJobs = [], isLoading, error } = useJobs();
    const cancelJobMutation = useCancelJob();

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    const handleCancelJob = async (jobId: string) => {
        if (confirm('Are you sure you want to cancel this job?')) {
            try {
                await cancelJobMutation.mutateAsync(jobId);
            } catch (error) {
                console.error('Failed to cancel job:', error);
            }
        }
    };

    const getJobTypeLabel = (jobType: string) => {
        switch (jobType) {
            case 'EmailSync':
                return 'Email Sync';
            case 'Classification':
                return 'Classification';
            case 'Extraction':
                return 'Extraction';
            default:
                return jobType;
        }
    };

    const getJobTypeIcon = (jobType: string) => {
        switch (jobType) {
            case 'EmailSync':
                return '📧';
            case 'Classification':
                return '🏷️';
            case 'Extraction':
                return '📊';
            default:
                return '⚙️';
        }
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Jobs</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load jobs. Please try again later.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Background Jobs</h1>
                <p className="text-gray-600">View and manage all background processing jobs</p>
            </div>

            {/* Jobs List */}
            {isLoading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Loader2 className="inline-block animate-spin h-8 w-8 text-blue-600 mb-4" />
                    <p className="text-gray-500">Loading jobs...</p>
                </div>
            ) : allJobs.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Yet</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        Background jobs will appear here once you trigger email sync, classification, or extraction.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="divide-y divide-gray-200">
                        {allJobs.map((job) => (
                            <div
                                key={job.id}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Job Header */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{getJobTypeIcon(job.jobType)}</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {getJobTypeLabel(job.jobType)}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    {formatDate(job.createdAt)}
                                                </div>
                                            </div>
                                            <JobStatusBadge status={job.status} />
                                        </div>

                                        {/* Job Stats */}
                                        <div className="flex items-center gap-6 text-sm mb-3">
                                            {job.totalItems > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">Progress:</span>
                                                    <span className="font-medium text-gray-900">
                                                        {job.processedItems} / {job.totalItems} items
                                                    </span>
                                                </div>
                                            )}
                                            {job.successCount > 0 && (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="font-medium">{job.successCount} success</span>
                                                </div>
                                            )}
                                            {job.failureCount > 0 && (
                                                <div className="flex items-center gap-1 text-red-600">
                                                    <XIcon className="w-4 h-4" />
                                                    <span className="font-medium">{job.failureCount} failed</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        {(job.status === 'Running' || job.status === 'Pending') && job.totalItems > 0 && (
                                            <div className="mb-3">
                                                <JobProgressBar
                                                    progress={job.progress}
                                                    processedItems={job.processedItems}
                                                    totalItems={job.totalItems}
                                                    successCount={job.successCount}
                                                    failureCount={job.failureCount}
                                                />
                                            </div>
                                        )}

                                        {/* Error Message */}
                                        {job.errorMessage && (
                                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-sm text-red-700 flex items-start gap-2">
                                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    {job.errorMessage}
                                                </p>
                                            </div>
                                        )}

                                        {/* Completion Time */}
                                        {job.completedAt && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Completed: {formatDate(job.completedAt)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Cancel Button */}
                                    {(job.status === 'Pending' || job.status === 'Running') && (
                                        <button
                                            onClick={() => handleCancelJob(job.id)}
                                            disabled={cancelJobMutation.isPending}
                                            className="ml-4 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <Ban className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
