import { useState } from 'react';
import { Button } from 'components/ui/button';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { CalendarEvent } from '../../types/calendar-event.types';
import { getTextColorClassFromBg } from '../../utils/date-utils';

interface ShowMorePopupProps {
  count: number;
  remainingEvents: CalendarEvent[];
  onClose?: () => void;
}

export const ShowMorePopup = ({ count, remainingEvents, onClose }: ShowMorePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const date = remainingEvents?.[0]?.start || new Date();

  return (
    <Popover
      open={isOpen}
      onOpenChange={(newOpen) => {
        setIsOpen(newOpen);
        if (!newOpen) onClose?.();
      }}
    >
      <PopoverTrigger asChild>
        <span className="text-xs font-normal text-medium-emphasis hover:text-high-emphasis hover:underline">
          +{count} more
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="flex items-center justify-between bg-surface px-3 py-1">
          <h2 className="text-sm font-bold text-medium-emphasis">{format(date, 'PPP')}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4 text-medium-emphasis" />
          </Button>
        </div>
        <div className="flex flex-col gap-[6px] py-2 px-3">
          {remainingEvents.map((event) => {
            const textColorClass = getTextColorClassFromBg(event.resource?.color);
            const bgColorClass = `${event.resource?.color}`;
            return (
              <div
                key={event.eventId}
                style={{
                  color: `${textColorClass}`,
                  backgroundColor: `${bgColorClass}`,
                }}
                className="flex items-center gap-1 py-[2px] px-1 rounded-[4px]"
              >
                <span className="text-xs font-semibold whitespace-nowrap">
                  {format(event.start, 'hh:mm')}
                </span>
                <span className="text-xs font-normal truncate max-w-full">{event.title}</span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
