import { useState } from 'react';
import { useWorkflowConfiguration, useUpdateWorkflowConfiguration } from '../hooks/use-workflow';
import { WorkflowMode, type UpdateWorkflowConfigRequest } from '../types/workflow';
import { Calendar, Hand, ArrowRight } from 'lucide-react';
import { cronToHumanReadable } from '../lib/cron-utils';

export function WorkflowPage() {
    const { data: config, isLoading } = useWorkflowConfiguration();
    const updateConfig = useUpdateWorkflowConfiguration();

    const [mode, setMode] = useState<WorkflowMode>(config?.mode ?? WorkflowMode.Manual);
    const [emailSyncSchedule, setEmailSyncSchedule] = useState(config?.emailSyncSchedule ?? '0 * * * *');
    const [classificationSchedule, setClassificationSchedule] = useState(config?.classificationSchedule ?? '0 * * * *');
    const [extractionSchedule, setExtractionSchedule] = useState(config?.extractionSchedule ?? '0 * * * *');
    const [pipelineSchedule, setPipelineSchedule] = useState(config?.pipelineSchedule ?? '0 9 * * *');
    const [emailSyncBatchSize, setEmailSyncBatchSize] = useState(config?.emailSyncBatchSize ?? 50);
    const [classificationBatchSize, setClassificationBatchSize] = useState(config?.classificationBatchSize ?? 20);
    const [extractionBatchSize, setExtractionBatchSize] = useState(config?.extractionBatchSize ?? 20);

    // Update local state when config loads
    useState(() => {
        if (config) {
            setMode(config.mode);
            setEmailSyncSchedule(config.emailSyncSchedule ?? '0 * * * *');
            setClassificationSchedule(config.classificationSchedule ?? '0 * * * *');
            setExtractionSchedule(config.extractionSchedule ?? '0 * * * *');
            setPipelineSchedule(config.pipelineSchedule ?? '0 9 * * *');
            setEmailSyncBatchSize(config.emailSyncBatchSize);
            setClassificationBatchSize(config.classificationBatchSize);
            setExtractionBatchSize(config.extractionBatchSize);
        }
    });

    const handleSave = async () => {
        const request: UpdateWorkflowConfigRequest = {
            mode,
            emailSyncSchedule: mode === WorkflowMode.Separate ? emailSyncSchedule : null,
            classificationSchedule: mode === WorkflowMode.Separate ? classificationSchedule : null,
            extractionSchedule: mode === WorkflowMode.Separate ? extractionSchedule : null,
            pipelineSchedule: mode === WorkflowMode.Sequential ? pipelineSchedule : null,
            emailSyncBatchSize,
            classificationBatchSize,
            extractionBatchSize,
        };

        await updateConfig.mutateAsync(request);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Workflow Automation</h1>
            <p className="text-gray-600 mb-6">
                Configure how your email processing jobs run automatically
            </p>

            {/* Mode Selection */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Workflow Mode</h2>

                <div className="space-y-4">
                    {/* Manual Mode */}
                    <div
                        onClick={() => setMode(WorkflowMode.Manual)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${mode === WorkflowMode.Manual
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start">
                            <Hand className="w-6 h-6 mr-3 mt-1 text-blue-600" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Manual Only</h3>
                                <p className="text-gray-600 text-sm">
                                    Trigger jobs manually when needed. No automation.
                                </p>
                            </div>
                            {mode === WorkflowMode.Manual && (
                                <div className="ml-2">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Separate Mode */}
                    <div
                        onClick={() => setMode(WorkflowMode.Separate)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${mode === WorkflowMode.Separate
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start">
                            <Calendar className="w-6 h-6 mr-3 mt-1 text-green-600" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Separate Schedules</h3>
                                <p className="text-gray-600 text-sm">
                                    Each job runs independently on its own schedule.
                                </p>
                            </div>
                            {mode === WorkflowMode.Separate && (
                                <div className="ml-2">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sequential Mode */}
                    <div
                        onClick={() => setMode(WorkflowMode.Sequential)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${mode === WorkflowMode.Sequential
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start">
                            <ArrowRight className="w-6 h-6 mr-3 mt-1 text-purple-600" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Sequential Pipeline</h3>
                                <p className="text-gray-600 text-sm">
                                    Jobs run in sequence: Sync → Classify → Extract
                                </p>
                            </div>
                            {mode === WorkflowMode.Sequential && (
                                <div className="ml-2">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Configuration based on selected mode */}
            {mode === WorkflowMode.Separate && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Separate Schedules</h2>
                    <div className="space-y-4">
                        <ScheduleInput
                            label="Email Sync Schedule"
                            value={emailSyncSchedule}
                            onChange={setEmailSyncSchedule}
                        />
                        <ScheduleInput
                            label="Classification Schedule"
                            value={classificationSchedule}
                            onChange={setClassificationSchedule}
                        />
                        <ScheduleInput
                            label="Extraction Schedule"
                            value={extractionSchedule}
                            onChange={setExtractionSchedule}
                        />
                    </div>
                </div>
            )}

            {mode === WorkflowMode.Sequential && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Pipeline Schedule</h2>
                    <ScheduleInput
                        label="Pipeline Schedule"
                        value={pipelineSchedule}
                        onChange={setPipelineSchedule}
                    />
                </div>
            )}

            {/* Batch Sizes */}
            {mode !== WorkflowMode.Manual && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Batch Sizes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Sync</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={emailSyncBatchSize}
                                onChange={(e) => setEmailSyncBatchSize(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Classification</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={classificationBatchSize}
                                onChange={(e) => setClassificationBatchSize(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Extraction</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={extractionBatchSize}
                                onChange={(e) => setExtractionBatchSize(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={updateConfig.isPending}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {updateConfig.isPending ? 'Saving...' : 'Save Configuration'}
            </button>

            {updateConfig.isSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Configuration saved successfully!
                </div>
            )}

            {updateConfig.isError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Error saving configuration. Please try again.
                </div>
            )}
        </div>
    );
}

// Schedule Input Component
function ScheduleInput({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    const [preset, setPreset] = useState('custom');

    const presets: Record<string, string> = {
        hourly: '0 * * * *',
        daily: '0 9 * * *',
        weekly: '0 9 * * 1',
        custom: value,
    };

    const handlePresetChange = (newPreset: string) => {
        setPreset(newPreset);
        if (newPreset !== 'custom') {
            onChange(presets[newPreset]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>

            {/* Preset Selector */}
            <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            >
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily at 9 AM</option>
                <option value="weekly">Weekly (Monday 9 AM)</option>
                <option value="custom">Custom</option>
            </select>

            {/* Cron Expression Input */}
            {preset === 'custom' && (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0 9 * * *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            )}

            <p className="text-sm text-gray-500 mt-1">
                {cronToHumanReadable(value)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Cron: {value}</p>
        </div>
    );
}
