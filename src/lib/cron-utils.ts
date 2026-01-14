import cronstrue from 'cronstrue';

/**
 * Translates a cron expression to human-readable text using cronstrue library.
 */
export function cronToHumanReadable(cron: string | null): string {
  if (!cron) return 'Not scheduled';

  try {
    return cronstrue.toString(cron, {
      use24HourTimeFormat: false,
      verbose: false,
    });
  } catch (error) {
    // If cronstrue fails to parse, return the raw cron expression
    console.warn('Failed to parse cron expression:', cron, error);
    return cron;
  }
}
