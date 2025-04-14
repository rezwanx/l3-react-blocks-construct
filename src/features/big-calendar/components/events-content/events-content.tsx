import { EventProps } from 'react-big-calendar';
import { format } from 'date-fns';
import { getTextColorClassFromBg } from '../../utils/date-utils';

export const EventsContent = ({ event }: Readonly<EventProps>) => {
  const time = event.start ? format(event.start, 'HH:mm') : '';
  const textColorClass = getTextColorClassFromBg(event?.resource?.color);
  const bgColorClass = `${event?.resource?.color}`;

  return (
    <div
      style={{
        color: `${textColorClass}`,
        backgroundColor: `${bgColorClass}`,
      }}
      className="flex items-center gap-1 py-[2px] px-1 rounded-[4px]"
    >
      <span className="text-xs font-semibold whitespace-nowrap">{time}</span>
      <span className="text-xs font-normal truncate max-w-full">{event.title}</span>
    </div>
  );
};
