// import { EventProps } from 'react-big-calendar';
import { CalendarEvent } from '../../types/calendar-event.types';
import { extractDateTime } from '../../utils/date-utils';

interface EventsContentProps {
  event: CalendarEvent;
}

export const EventsContent = ({ event }: EventsContentProps) => {
  const { time } = extractDateTime(event?.start);

  return (
    <div className={`flex items-center py-[2px] px-1 gap-1 rounded-[4px] bg-${event?.color}`}>
      <span className="text-xs font-semibold text-high-emphasis">{time}</span>
      <span className="text-xs font-normal text-high-emphasis">{event?.title}</span>
    </div>
  );
};
