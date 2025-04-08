import { View } from 'react-big-calendar';
import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  format,
  startOfDay,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';

export const addTime = (date: Date, view: View): Date => {
  switch (view) {
    case 'agenda':
      return addDays(date, 7);
    case 'day':
      return addDays(date, 1);
    case 'week':
      return addWeeks(date, 1);
    case 'month':
      return addMonths(date, 1);
    default:
      return date;
  }
};

export const subtractTime = (date: Date, view: View): Date => {
  switch (view) {
    case 'agenda':
      return subDays(date, 7);
    case 'day':
      return subDays(date, 1);
    case 'week':
      return subWeeks(date, 1);
    case 'month':
      return subMonths(date, 1);
    default:
      return date;
  }
};

export const formattedDate = (date: Date, currentView: View) => {
  switch (currentView) {
    case 'agenda':
      return `(${format(date, 'MMM d')} - ${format(addDays(date, 6), 'MMM d, yyyy')})`;
    case 'day':
      return format(date, 'EEEE, MMMM d, yyyy');
    case 'week':
      return `${format(date, 'MMM d')} - ${format(addDays(date, 6), 'MMM d, yyyy')}`;
    case 'month':
      return format(date, 'MMMM yyyy');
    default:
      return format(date, 'PPP');
  }
};

/**
 * Extracts the date and time from an ISO formatted string or a Date object.
 * @param isoInput - A datetime string in ISO format (e.g., "2025-04-01T09:00:00.000Z") or a Date object.
 * @returns An object with 'date' in 'YYYY-MM-DD' format and 'time' in 'HH:MM:SS' format.
 */

export const extractDateTime = (isoInput: string | Date): { date: string; time: string } => {
  const dateObj = typeof isoInput === 'string' ? new Date(isoInput) : isoInput;

  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(dateObj.getUTCDate()).padStart(2, '0');

  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  return {
    date: `${day}.${month}.${year}`,
    time: `${hours}:${minutes}`,
  };
};

export const timePickerRange = Array.from({ length: 48 }, (_, i) => {
  const time = addMinutes(startOfDay(new Date()), i * 30);
  return format(time, 'HH:mm');
});
