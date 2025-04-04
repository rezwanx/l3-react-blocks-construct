export enum CalendarEventColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DEEPPURPLE = 'purple',
  BURGUNDY = 'burgundy',
  WARNING = 'warning',
  PRIMARY100 = 'primary-100',
  SECONDARY100 = 'secondary-100',
  DEEPPURPLE100 = 'purple-100',
  BURGUNDY100 = 'burgundy-100',
}

export type CustomView = 'month' | 'week' | 'day' | 'agenda' | 'year';

export const CALENDAR_VIEWS: CustomView[] = ['agenda', 'day', 'week', 'month', 'year'];

export enum MEMBER_STATUS {
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  NORESPONSE = 'no response',
}

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
