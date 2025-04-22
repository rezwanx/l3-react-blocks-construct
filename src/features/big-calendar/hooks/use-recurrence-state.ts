import { useState, useEffect } from 'react';
import { addMonths } from 'date-fns';
import { CalendarEvent } from '../types/calendar-event.types';

// Helper function to determine recurrence pattern from existing events
export const analyzeRecurringPattern = (events: CalendarEvent[]) => {
  if (!events || events.length < 2) return null;

  // Sort events by start date
  const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  // Get the first two events to analyze the pattern
  const first = sortedEvents[0];
  const second = sortedEvents[1];

  // Calculate the difference in days
  const diffTime = Math.abs(second.start.getTime() - first.start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Analyze which days of the week are included
  const weekdays = sortedEvents.slice(0, Math.min(7, sortedEvents.length)).map((event) => {
    const day = event.start.getDay();
    // Convert from JS day (0=Sunday) to our format (MO, TU, etc.)
    const dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return dayNames[day];
  });

  // Remove duplicates
  const uniqueDays = Array.from(new Set(weekdays));

  // Determine the period and interval
  let period = 'Week';
  let interval = 1;

  if (diffDays === 1) {
    period = 'Day';
    interval = 1;
  } else if (diffDays === 7) {
    period = 'Week';
    interval = 1;
  } else if (diffDays > 1 && diffDays < 7) {
    period = 'Day';
    interval = diffDays;
  } else if (diffDays > 7 && diffDays % 7 === 0) {
    period = 'Week';
    interval = diffDays / 7;
  } else if (diffDays >= 28 && diffDays <= 31) {
    period = 'Month';
    interval = 1;
  } else if (diffDays >= 365 && diffDays <= 366) {
    period = 'Year';
    interval = 1;
  }

  return {
    period,
    interval,
    selectedDays: uniqueDays,
    occurrenceCount: events.length,
    endDate: sortedEvents[sortedEvents.length - 1].start,
  };
};



export const useRecurrenceState = (event: CalendarEvent) => {
  // Load any temp event data saved before navigating here
  const [initialRecurrenceEvent] = useState<CalendarEvent>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('tempEditEvent');
      if (saved) {
        const parsed = JSON.parse(saved) as CalendarEvent;
        return {
          ...parsed,
          start: new Date(parsed.start),
          end: new Date(parsed.end),
          events: parsed.events
            ? parsed.events.map((evt) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
              }))
            : [],
          resource: { ...parsed.resource },
        } as CalendarEvent;
      }
    }
    return event;
  });

  const defaultEndDate = addMonths(new Date(), 1);

  const [onDate, setOnDate] = useState<Date | undefined>(defaultEndDate);
  const [interval, setInterval] = useState<number>(1);
  const [period, setPeriod] = useState<string>('Week');
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    if (initialRecurrenceEvent.events && initialRecurrenceEvent.events.length > 0) {
      const dayNamesArr = ['SU','MO','TU','WE','TH','FR','SA'];
      return Array.from(
        new Set(initialRecurrenceEvent.events.map(evt => dayNamesArr[new Date(evt.start).getDay()]))
      );
    }
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('tempRecurringEvents');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Check if we're dealing with the new format (pattern info) or old format (event array)
          if (parsed.selectedDays) {
            // New format with pattern info
            return parsed.selectedDays;
          } else {
            // Old format with event array
            const dayNamesArr = ['SU','MO','TU','WE','TH','FR','SA'];
            return Array.from(
              new Set(parsed.map((evt: { start: string | Date }) => dayNamesArr[new Date(evt.start).getDay()]))
            );
          }
        } catch (error) {
          console.error('Error parsing tempRecurringEvents:', error);
        }
      }
    }
    return [];
  });
  const [endType, setEndType] = useState<'never' | 'on' | 'after'>('never');
  const [occurrenceCount, setOccurrenceCount] = useState<number>(5);

  // Pre-fill form fields if editing an existing recurring event
  useEffect(() => {
    const saved = typeof window !== 'undefined' && window.localStorage.getItem('tempRecurringEvents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if we're dealing with the new format (pattern info) or old format (event array)
        if (parsed.period) {
          // New format with pattern info
          setPeriod(parsed.period);
          setInterval(parsed.interval);
          setSelectedDays(parsed.selectedDays || []);
          setOccurrenceCount(parsed.occurrenceCount || 5);
          if (parsed.endType) {
            setEndType(parsed.endType);
          }
          if (parsed.onDate) {
            setOnDate(new Date(parsed.onDate));
          }
          return;
        }
      } catch (error) {
        console.error('Error parsing saved pattern:', error);
      }
    }
    
    if (!saved && (!initialRecurrenceEvent.events || initialRecurrenceEvent.events.length < 2)) {
      const currentDayOfWeek = initialRecurrenceEvent.start.getDay();
      const dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      setSelectedDays([dayNames[currentDayOfWeek]]);
    } else if (!saved) {
      const pattern = analyzeRecurringPattern(initialRecurrenceEvent.events || []);
      if (pattern) {
        setPeriod(pattern.period);
        setInterval(pattern.interval);
        setSelectedDays(pattern.selectedDays);
        setOccurrenceCount(pattern.occurrenceCount);
        if (pattern.endDate) {
          setEndType('on');
          setOnDate(pattern.endDate);
        }
      }
    }
  }, [initialRecurrenceEvent]);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return {
    initialRecurrenceEvent,
    onDate,
    setOnDate,
    interval,
    setInterval,
    period,
    setPeriod,
    selectedDays,
    setSelectedDays,
    endType,
    setEndType,
    occurrenceCount,
    setOccurrenceCount,
    handleDayToggle,
  };
};
