import { Event } from 'react-big-calendar';
import { CalendarEventColor } from '../enums/calendar.enum';

export interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  invitedParticipants?: {
    total: number;
    accepted: number;
    declined: number;
    noResponse: number;
  };
  description?: string;
  color?: CalendarEventColor;
}
