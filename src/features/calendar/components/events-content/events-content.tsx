import { CalendarEventColor, EventContentTextColor } from '../../enums/calendar.enum';
import { CalendarEvent } from '../../types/calendar-event.types';
import { extractDateTime } from '../../utils/date-utils';

interface EventsContentProps {
  event: CalendarEvent;
}

/**
 * Enums Mapping a background color to the corresponding text color class.
 */
const getTextColorClassFromBg = (bgColor?: string): string => {
  if (!bgColor) return 'text-high-emphasis';

  const matchedKey = Object.entries(CalendarEventColor).find(
    ([, value]) => value === bgColor
  )?.[0] as keyof typeof EventContentTextColor | undefined;

  return matchedKey ? EventContentTextColor[matchedKey] : 'text-high-emphasis';
};

export const EventsContent = ({ event }: Readonly<EventsContentProps>) => {
  const { time } = extractDateTime(event.start);
  const textColorClass = getTextColorClassFromBg(event.color);
  const bgColorClass = `bg-${event.color}`;

  return (
    <div
      className={`flex items-center gap-1 py-[2px] px-1 rounded-[4px] ${bgColorClass} ${textColorClass}`}
    >
      <span className="text-xs font-semibold whitespace-nowrap">{time}</span>
      <span className="text-xs font-normal truncate max-w-full">{event.title}</span>
    </div>
  );
};
