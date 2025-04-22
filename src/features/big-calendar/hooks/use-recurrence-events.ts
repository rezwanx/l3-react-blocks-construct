import { format } from 'date-fns';
import { RRule } from 'rrule';
import { CalendarEvent } from '../types/calendar-event.types';
import { FREQUENCY_MAP } from '../constants/calendar.constants';

interface RecurrenceOptions {
  period: string;
  interval: number;
  selectedDays: string[];
  endType: 'never' | 'on' | 'after';
  onDate?: Date;
  occurrenceCount: number;
}

export const useRecurrenceEvents = () => {
  // Generate recurring events based on the recurrence options
  const generateRecurringEvents = (
    baseEvent: CalendarEvent,
    options: RecurrenceOptions
  ) => {
    const { period, interval, selectedDays, endType, onDate, occurrenceCount } = options;

    // Build the rule string based on user selections
    let ruleString = `FREQ=${FREQUENCY_MAP[period]};INTERVAL=${interval}`;

    // Add weekdays if selected
    if (selectedDays.length > 0) {
      ruleString += `;BYDAY=${selectedDays.join(',')}`;
    }

    // Add end conditions based on user selection
    if (endType === 'on' && onDate) {
      ruleString += `;UNTIL=${format(onDate, 'yyyyMMdd')}T${format(onDate, 'HHmmss')}Z`;
    } else if (endType === 'after') {
      ruleString += `;COUNT=${occurrenceCount}`;
    }

    const rule = RRule.fromString(ruleString);

    // Generate occurrences within the specified range
    const eventOccurrences = rule.between(
      baseEvent.start,
      endType === 'on' && onDate
        ? onDate
        : new Date(new Date(baseEvent.start).getTime() + 365 * 24 * 60 * 60 * 1000)
    );

    // Calculate the original event duration in milliseconds
    const eventDuration = baseEvent.end.getTime() - baseEvent.start.getTime();

    // Get the original event's hours, minutes, seconds, milliseconds
    const originalStartHours = baseEvent.start.getHours();
    const originalStartMinutes = baseEvent.start.getMinutes();
    const originalStartSeconds = baseEvent.start.getSeconds();
    const originalStartMs = baseEvent.start.getMilliseconds();

    return eventOccurrences.map((date) => {
      // Create a new start date with the same time as the original event
      const newStart = new Date(date);
      newStart.setHours(
        originalStartHours,
        originalStartMinutes,
        originalStartSeconds,
        originalStartMs
      );

      // Create end date by adding the original duration to the new start date
      const newEnd = new Date(newStart.getTime() + eventDuration);

      // Create a new event based on baseEvent template
      return {
        ...baseEvent,
        eventId: crypto.randomUUID(),
        start: newStart,
        end: newEnd,
        resource: {
          ...baseEvent.resource,
          color: baseEvent.resource?.color || 'hsl(var(--primary-500))',
          recurring: true,
        },
      };
    });
  };

  return {
    generateRecurringEvents,
  };
};
