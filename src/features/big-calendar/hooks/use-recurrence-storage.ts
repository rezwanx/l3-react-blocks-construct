import { CalendarEvent } from '../types/calendar-event.types';

interface RecurrencePattern {
  period: string;
  interval: number;
  selectedDays: string[];
  endType: 'never' | 'on' | 'after';
  occurrenceCount: number;
  onDate?: string;
  events: Array<{
    eventId?: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    allDay?: boolean;
    resource?: {
      recurring: boolean;
      color: string;
    };
  }>;
}

export const useRecurrenceStorage = () => {
  // Save recurrence pattern and events to localStorage
  const saveRecurrenceData = (
    recurringEvents: CalendarEvent[],
    pattern: {
      period: string;
      interval: number;
      selectedDays: string[];
      endType: 'never' | 'on' | 'after';
      occurrenceCount: number;
      onDate?: Date;
    }
  ) => {
    try {
      // Store only essential data and limit to a reasonable number of events (e.g., 20)
      const limitedEvents = recurringEvents.slice(0, 20).map(evt => ({
        eventId: evt.eventId,
        title: evt.title,
        start: evt.start.toISOString(),
        end: evt.end.toISOString(),
        allDay: evt.allDay,
        // Only include essential resource properties
        resource: {
          recurring: true,
          color: evt.resource?.color || 'hsl(var(--primary-500))',
        }
      }));
      
      // Store the pattern information instead of all events
      const patternInfo: RecurrencePattern = {
        period: pattern.period,
        interval: pattern.interval,
        selectedDays: pattern.selectedDays,
        endType: pattern.endType,
        occurrenceCount: pattern.occurrenceCount,
        onDate: pattern.onDate?.toISOString(),
        events: limitedEvents
      };
      
      window.localStorage.setItem('tempRecurringEvents', JSON.stringify(patternInfo));
      return true;
    } catch (error) {
      console.error('Error saving recurring events:', error);
      return false;
    }
  };

  return {
    saveRecurrenceData,
  };
};
