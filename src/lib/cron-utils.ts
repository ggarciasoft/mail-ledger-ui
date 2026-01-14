/**
 * Translates a cron expression to human-readable text.
 * Supports common patterns used in the workflow automation.
 */
export function cronToHumanReadable(cron: string | null): string {
  if (!cron) return 'Not scheduled';

  // Common patterns
  const patterns: Record<string, string> = {
    '0 * * * *': 'Every hour',
    '*/15 * * * *': 'Every 15 minutes',
    '*/30 * * * *': 'Every 30 minutes',
    '0 */2 * * *': 'Every 2 hours',
    '0 */4 * * *': 'Every 4 hours',
    '0 */6 * * *': 'Every 6 hours',
    '0 */12 * * *': 'Every 12 hours',
    '0 0 * * *': 'Daily at midnight',
    '0 9 * * *': 'Daily at 9:00 AM',
    '0 12 * * *': 'Daily at noon',
    '0 18 * * *': 'Daily at 6:00 PM',
    '0 0 * * 0': 'Weekly on Sunday at midnight',
    '0 9 * * 1': 'Weekly on Monday at 9:00 AM',
    '0 9 * * 2': 'Weekly on Tuesday at 9:00 AM',
    '0 9 * * 3': 'Weekly on Wednesday at 9:00 AM',
    '0 9 * * 4': 'Weekly on Thursday at 9:00 AM',
    '0 9 * * 5': 'Weekly on Friday at 9:00 AM',
    '0 9 * * 6': 'Weekly on Saturday at 9:00 AM',
    '0 0 1 * *': 'Monthly on the 1st at midnight',
    '0 9 1 * *': 'Monthly on the 1st at 9:00 AM',
  };

  // Check for exact match
  if (patterns[cron]) {
    return patterns[cron];
  }

  // Parse cron expression: minute hour day month dayOfWeek
  const parts = cron.split(' ');
  if (parts.length !== 5) {
    return cron; // Return raw cron if invalid format
  }

  const [minute, hour, day, month, dayOfWeek] = parts;

  try {
    // Every X minutes
    if (minute.startsWith('*/') && hour === '*' && day === '*' && month === '*' && dayOfWeek === '*') {
      const interval = minute.substring(2);
      return `Every ${interval} minutes`;
    }

    // Every X hours
    if (minute === '0' && hour.startsWith('*/') && day === '*' && month === '*' && dayOfWeek === '*') {
      const interval = hour.substring(2);
      return `Every ${interval} hours`;
    }

    // Daily at specific time
    if (day === '*' && month === '*' && dayOfWeek === '*') {
      const hourNum = parseInt(hour);
      const minuteNum = parseInt(minute);
      if (!isNaN(hourNum) && !isNaN(minuteNum)) {
        const time = formatTime(hourNum, minuteNum);
        return `Daily at ${time}`;
      }
    }

    // Weekly on specific day
    if (day === '*' && month === '*' && dayOfWeek !== '*') {
      const hourNum = parseInt(hour);
      const minuteNum = parseInt(minute);
      const dayNum = parseInt(dayOfWeek);
      if (!isNaN(hourNum) && !isNaN(minuteNum) && !isNaN(dayNum)) {
        const dayName = getDayName(dayNum);
        const time = formatTime(hourNum, minuteNum);
        return `Weekly on ${dayName} at ${time}`;
      }
    }

    // Monthly on specific day
    if (month === '*' && dayOfWeek === '*' && day !== '*') {
      const hourNum = parseInt(hour);
      const minuteNum = parseInt(minute);
      const dayNum = parseInt(day);
      if (!isNaN(hourNum) && !isNaN(minuteNum) && !isNaN(dayNum)) {
        const time = formatTime(hourNum, minuteNum);
        const suffix = getDaySuffix(dayNum);
        return `Monthly on the ${dayNum}${suffix} at ${time}`;
      }
    }

    // Fallback to raw cron
    return cron;
  } catch {
    return cron;
  }
}

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

function getDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day % 7] || 'Unknown';
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}
