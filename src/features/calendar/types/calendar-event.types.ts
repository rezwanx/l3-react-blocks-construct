import { Event } from 'react-big-calendar';
import {  MEMBER_STATUS } from '../enums/calendar.enum';

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
  meetingLink?: string;
  allDay?: boolean;
  description?: string;
  color?: string;
  resource?: {
    members: Member[];
  };
}
