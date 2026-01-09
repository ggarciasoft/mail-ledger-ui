import { useState, useEffect } from 'react';
import { useProcessingStatus, useTriggerClassification, useTriggerExtraction } from '../hooks/use-processing';
import { Play, AlertCircle, Zap, FileCheck } from 'lucide-react';
import ProgressIndicator from '../components/ProgressIndicator';

export default function ProcessingPage() {
    const [batchSize, setBatchSize] = useState(50);
    const [pollingInterval, setPollingInterval] = useState<number | false>(false);

    const { data: status, isLoading, error } = useProcessingStatus(pollingInterval);
    const classifyMutation = useTriggerClassification();
    const extractMutation = useTriggerExtraction();

    // Enable polling when jobs are running
    useEffect(() => {
        if (status?.isClassifying || status?.isExtracting) {
            setPollingInterval(2000); // Poll every 2 seconds
        } else {
            setPollingInterval(false);
        }
    }, [status?.isClassifying, status?.isExtracting]);

    const handleTriggerClassification = async () => {
        try {
            await classifyMutation.mutateAsync({ batchSize });
        } catch (error) {
            console.error('Failed to trigger classification:', error);
        }
    };

    const handleTriggerExtraction = async () => {
        try {
            await extractMutation.mutateAsync({ batchSize });
        } catch (error) {
            console.error('Failed to trigger extraction:', error);
        }
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
                <p className="text-gray-600">Trigger and monitor batch AI processing jobs</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Batch Configuration</h2>

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
                        disabled={status?.isClassifying || status?.isExtracting}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Number of items to process in this batch
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleTriggerClassification}
                        disabled={status?.isClassifying || classifyMutation.isPending || isLoading}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Zap className="w-5 h-5 mr-2" />
                        {status?.isClassifying ? 'Classifying...' : 'Trigger Classification'}
                    </button>

                    <button
                        onClick={handleTriggerExtraction}
                        disabled={status?.isExtracting || extractMutation.isPending || isLoading}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FileCheck className="w-5 h-5 mr-2" />
                        {status?.isExtracting ? 'Extracting...' : 'Trigger Extraction'}
                    </button>
                </div>
            </div>

            {/* Progress Indicators */}
            {isLoading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-500">Loading status...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Classification Progress */}
                    {status?.classificationProgress && (
                        <ProgressIndicator
                            progress={status.classificationProgress}
                            title="Email Classification"
                        />
                    )}

                    {/* Extraction Progress */}
                    {status?.extractionProgress && (
                        <ProgressIndicator
                            progress={status.extractionProgress}
                            title="Data Extraction"
                        />
                    )}

                    {/* No Active Jobs */}
                    {!status?.classificationProgress && !status?.extractionProgress && (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Play className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Jobs</h3>
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
