import { addMinutes, format, startOfDay } from 'date-fns';
import { CalendarEventColor, EventContentTextColor } from '../enums/calendar.enum';

export const timePickerRange = Array.from({ length: 48 }, (_, i) => {
  const time = addMinutes(startOfDay(new Date()), i * 30);
  return format(time, 'HH:mm');
});

export const getTextColorClassFromBg = (bgColor?: string): string => {
  if (!bgColor) return 'hsl(var(--high-emphasis))';

  const matchedKey = Object.entries(CalendarEventColor).find(
    ([, value]) => value === bgColor
  )?.[0] as keyof typeof EventContentTextColor | undefined;

  return matchedKey ? EventContentTextColor[matchedKey] : 'hsl(var(--high-emphasis))';
};
