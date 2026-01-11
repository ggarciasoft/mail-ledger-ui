import * as signalR from '@microsoft/signalr';
import type { ProcessingJob } from '../types/processing-job';

type JobEventCallback = (job: ProcessingJob) => void;

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private listeners: Map<string, Set<JobEventCallback>> = new Map();
    private isConnecting = false;

    async connect(userId: string, accessToken: string, abortSignal?: AbortSignal): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            console.log('SignalR already connected');
            return;
        }

        if (this.isConnecting) {
            console.log('SignalR connection already in progress');
            return;
        }

        // Check if already aborted
        if (abortSignal?.aborted) {
            console.log('SignalR: Connection aborted before start');
            return;
        }

        try {
            this.isConnecting = true;

            console.log('SignalR: Building connection to', import.meta.env.VITE_API_URL + '/hubs/jobs');

            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_API_URL + '/hubs/jobs', {
                    accessTokenFactory: () => accessToken,
                })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

            // Set up event handlers
            this.connection.on('JobUpdated', (job: ProcessingJob) => {
                console.log('SignalR: Job updated', job);
                this.notifyListeners('JobUpdated', job);
            });

            this.connection.on('JobCompleted', (job: ProcessingJob) => {
                console.log('SignalR: Job completed', job);
                this.notifyListeners('JobCompleted', job);
            });

            this.connection.on('JobFailed', (job: ProcessingJob) => {
                console.log('SignalR: Job failed', job);
                this.notifyListeners('JobFailed', job);
            });

            this.connection.onreconnecting(() => {
                console.log('SignalR: Reconnecting...');
            });

            this.connection.onreconnected(() => {
                console.log('SignalR: Reconnected');
                // Rejoin user group after reconnection
                if (this.connection) {
                    this.connection.invoke('JoinUserGroup', userId).catch((err) => {
                        console.error('Failed to rejoin user group:', err);
                    });
                }
            });

            this.connection.onclose((error) => {
                console.log('SignalR: Connection closed', error);
            });

            // Check abort signal before starting
            if (abortSignal?.aborted) {
                console.log('SignalR: Aborted before connection start');
                this.connection = null;
                return;
            }

            console.log('SignalR: Starting connection...');
            await this.connection.start();
            
            // Check abort signal after starting
            if (abortSignal?.aborted) {
                console.log('SignalR: Aborted after connection start, disconnecting');
                await this.connection.stop();
                this.connection = null;
                return;
            }

            console.log('SignalR: Connected successfully, state:', this.connection.state);

            // Join user-specific group
            if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
                console.log('SignalR: Invoking JoinUserGroup for user', userId);
                await this.connection.invoke('JoinUserGroup', userId);
                console.log(`SignalR: Joined user group for user ${userId}`);
            } else {
                console.warn('SignalR: Connection not in Connected state, cannot join group');
            }
        } catch (error) {
            console.error('SignalR connection error:', error);
            console.error('Error details:', {
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                url: import.meta.env.VITE_API_URL + '/hubs/jobs'
            });
            this.connection = null;
            throw error;
        } finally {
            this.isConnecting = false;
        }
    }

    subscribe(event: string, callback: JobEventCallback): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        // Return unsubscribe function
        return () => {
            this.listeners.get(event)?.delete(callback);
        };
    }

    async disconnect(userId: string): Promise<void> {
        if (this.connection) {
            try {
                // Only invoke LeaveUserGroup if connection is actually connected
                if (this.connection.state === signalR.HubConnectionState.Connected) {
                    await this.connection.invoke('LeaveUserGroup', userId);
                }
                await this.connection.stop();
                console.log('SignalR: Disconnected');
            } catch (error) {
                console.error('SignalR disconnect error:', error);
            } finally {
                this.connection = null;
            }
        }
    }

    private notifyListeners(event: string, job: ProcessingJob): void {
        this.listeners.get(event)?.forEach((callback) => callback(job));
    }

    getConnectionState(): signalR.HubConnectionState | null {
        return this.connection?.state ?? null;
    }
}

export const signalRService = new SignalRService();
