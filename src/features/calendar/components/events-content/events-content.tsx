import { CalendarEventColor, EventContentTextColor } from '../../enums/calendar.enum';
import { CalendarEvent } from '../../types/calendar-event.types';
import { extractDateTime } from '../../utils/date-utils';

interface EventsContentProps {
  event: CalendarEvent;
}

export const EventsContent = ({ event }: Readonly<EventsContentProps>) => {
  const { time } = extractDateTime(event?.start);

  const getTextColorFromBg = (bgColor?: string): string => {
    const key = Object.keys(CalendarEventColor).find(
      (k) => CalendarEventColor[k as keyof typeof CalendarEventColor] === bgColor
    ) as keyof typeof EventContentTextColor | undefined;

    return key ? EventContentTextColor[key] : 'text-high-emphasis';
  };

  const textColor = getTextColorFromBg(event.color);

  return (
    <div
      className={`flex items-center py-[2px] px-1 gap-1 rounded-[4px] bg-${event.color} ${textColor}`}
    >
      <span className="text-xs font-semibold">{time}</span>
      <span className="text-xs font-normal truncate max-w-full">{event.title}</span>
    </div>
  );
};
