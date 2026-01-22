import { useState, useEffect } from 'react';
import { useProcessingStatus, useTriggerClassification, useTriggerExtraction } from '../hooks/use-processing';
import { useSubscriptionUsage } from '../hooks/use-subscription';
import { useJob, useActiveJobs } from '../hooks/use-jobs';
import { useQueryClient } from '@tanstack/react-query';
import { Play, AlertCircle, Zap, FileCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import JobStatusBadge from '../components/JobStatusBadge';
import JobProgressBar from '../components/JobProgressBar';

export default function ProcessingPage() {
    const [batchSize, setBatchSize] = useState(50);
    const [classifyJobId, setClassifyJobId] = useState<string | null>(null);
    const [extractJobId, setExtractJobId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const queryClient = useQueryClient();
    const { data: status, isLoading, error, refetch } = useProcessingStatus();
    const { data: usage } = useSubscriptionUsage();
    const classifyMutation = useTriggerClassification();
    const extractMutation = useTriggerExtraction();
    const { data: activeJobs } = useActiveJobs();

    // Track current jobs
    const { data: classifyJob } = useJob(classifyJobId);
    const { data: extractJob } = useJob(extractJobId);

    // Refetch subscription usage when jobs complete
    useEffect(() => {
        if (classifyJob && classifyJob.status === 'Completed') {
            queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
        }
    }, [classifyJob, queryClient]);

    useEffect(() => {
        if (extractJob && extractJob.status === 'Completed') {
            queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
        }
    }, [extractJob, queryClient]);

    // Check if any jobs are currently running or mutations are pending
    const hasRunningJobs = activeJobs && activeJobs.length > 0;
    const isAnyMutationPending = classifyMutation.isPending || extractMutation.isPending;

    // Check if email limit is reached
    const classificationLimitReached = usage ? usage.emailsClassified >= usage.classificationLimit : false;
    const extractionLimitReached = usage ? usage.emailsExtracted >= usage.extractionLimit : false;

    const handleTriggerClassification = async () => {
        // Clear previous messages
        setSuccessMessage(null);
        setErrorMessage(null);

        // Check if a job is already running or mutation is pending
        if (hasRunningJobs || classifyMutation.isPending) {
            setErrorMessage('Cannot start a new job while another job is running. Please wait for the current job to complete.');
            return;
        }

        try {
            const result = await classifyMutation.mutateAsync({ batchSize });
            setClassifyJobId(result.jobId);
            setSuccessMessage(`Classification job started successfully! Processing up to ${batchSize} emails.`);
            refetch();

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error: any) {
            console.error('Failed to trigger classification:', error);
            // Extract error message from API response
            const errorMsg = error?.response?.data?.error || 'Failed to start classification job. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    const handleTriggerExtraction = async () => {
        // Clear previous messages
        setSuccessMessage(null);
        setErrorMessage(null);

        // Check if a job is already running or mutation is pending
        if (hasRunningJobs || extractMutation.isPending) {
            setErrorMessage('Cannot start a new job while another job is running. Please wait for the current job to complete.');
            return;
        }

        try {
            const result = await extractMutation.mutateAsync({ batchSize });
            setExtractJobId(result.jobId);
            setSuccessMessage(`Extraction job started successfully! Processing up to ${batchSize} candidates.`);
            refetch();

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (error: any) {
            console.error('Failed to trigger extraction:', error);
            // Extract error message from API response
            const errorMsg = error?.response?.data?.error || 'Failed to start extraction job. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-900 font-semibold mb-1">Error Loading Processing Status</h3>
                        <p className="text-red-700 text-sm">
                            {(error as Error)?.message || 'Failed to load processing status. Please try again later.'}
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Processing Management</h1>
                <p className="text-gray-600">Trigger batch AI processing jobs for email classification and data extraction</p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-green-800 font-medium">{successMessage}</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-800 font-medium">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Status Overview */}
            {!isLoading && status && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Classification Status */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Classification</h3>
                            <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending Emails:</span>
                                <span className="text-lg font-semibold text-gray-900">{status.pendingClassification}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Can Process:</span>
                                <span className={`text-sm font-medium ${status.canClassify ? 'text-green-600' : 'text-gray-400'}`}>
                                    {status.canClassify ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Extraction Status */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Extraction</h3>
                            <FileCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending Emails:</span>
                                <span className="text-lg font-semibold text-gray-900">{status.pendingExtraction}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Can Process:</span>
                                <span className={`text-sm font-medium ${status.canExtract ? 'text-green-600' : 'text-gray-400'}`}>
                                    {status.canExtract ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Trigger Processing</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Batch Size
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="1000"
                        value={batchSize}
                        onChange={(e) => setBatchSize(parseInt(e.target.value) || 50)}
                        className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={classifyMutation.isPending || extractMutation.isPending}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Number of items to process in this batch
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <button
                            onClick={handleTriggerClassification}
                            disabled={!status?.canClassify || isAnyMutationPending || hasRunningJobs || isLoading || classificationLimitReached}
                            className="flex flex-col items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center">
                                <Zap className="w-5 h-5 mr-2" />
                                {classifyMutation.isPending ? 'Processing...' : hasRunningJobs ? 'Job Running...' : 'Trigger Classification'}
                            </div>
                            {usage && (
                                <span className="text-xs mt-1 opacity-90">
                                    {usage.emailsClassified}/{usage.classificationLimit} used this month
                                </span>
                            )}
                        </button>
                        {classificationLimitReached && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Monthly classification limit reached. Please upgrade your subscription.
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        )}
                    </div>

                    <div className="relative group">
                        <button
                            onClick={handleTriggerExtraction}
                            disabled={!status?.canExtract || isAnyMutationPending || hasRunningJobs || isLoading || extractionLimitReached}
                            className="flex flex-col items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center">
                                <FileCheck className="w-5 h-5 mr-2" />
                                {extractMutation.isPending ? 'Processing...' : hasRunningJobs ? 'Job Running...' : 'Trigger Extraction'}
                            </div>
                            {usage && (
                                <span className="text-xs mt-1 opacity-90">
                                    {usage.emailsExtracted}/{usage.extractionLimit} used this month
                                </span>
                            )}
                        </button>
                        {extractionLimitReached && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Monthly extraction limit reached. Please upgrade your subscription.
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Last Job Results */}
            {isLoading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-500">Loading status...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Last Classification Job */}
                    {status?.lastClassificationJob && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Classification Job</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Processed</p>
                                    <p className="text-2xl font-semibold text-gray-900">{status.lastClassificationJob.processed}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Succeeded</p>
                                    <p className="text-2xl font-semibold text-green-600 flex items-center">
                                        {status.lastClassificationJob.succeeded}
                                        <CheckCircle2 className="w-5 h-5 ml-1" />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Failed</p>
                                    <p className="text-2xl font-semibold text-red-600 flex items-center">
                                        {status.lastClassificationJob.failed}
                                        <XCircle className="w-5 h-5 ml-1" />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Started</p>
                                    <p className="text-sm font-medium text-gray-900">{formatDate(status.lastClassificationJob.startedAt)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Last Extraction Job */}
                    {status?.lastExtractionJob && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Extraction Job</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Processed</p>
                                    <p className="text-2xl font-semibold text-gray-900">{status.lastExtractionJob.processed}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Succeeded</p>
                                    <p className="text-2xl font-semibold text-green-600 flex items-center">
                                        {status.lastExtractionJob.succeeded}
                                        <CheckCircle2 className="w-5 h-5 ml-1" />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Failed</p>
                                    <p className="text-2xl font-semibold text-red-600 flex items-center">
                                        {status.lastExtractionJob.failed}
                                        <XCircle className="w-5 h-5 ml-1" />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Started</p>
                                    <p className="text-sm font-medium text-gray-900">{formatDate(status.lastExtractionJob.startedAt)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* No Jobs Yet */}
                    {!status?.lastClassificationJob && !status?.lastExtractionJob && (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Play className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Run Yet</h3>
                            <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                Trigger a classification or extraction job to process emails and extract financial data.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
