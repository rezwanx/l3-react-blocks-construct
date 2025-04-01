import { View } from 'react-big-calendar';
import { addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks } from 'date-fns';

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