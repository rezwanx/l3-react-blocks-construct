import { Event } from 'react-big-calendar';
import { CalendarEventColor, MEMBER_STATUS } from '../enums/calendar.enum';

export interface Member {
  id: string;
  name: string;
  image: string;
  status: MEMBER_STATUS;
}
export interface CalendarEvent extends Event {
  eventId?: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  color?: CalendarEventColor;
  resource?: {
    members: Member[];
  };
}
