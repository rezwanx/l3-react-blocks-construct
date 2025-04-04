import { useMemo } from 'react';
import { format, isSameDay, isToday } from 'date-fns';
import { CalendarEvent } from '../../types/calendar-event.types';
import { WEEK_DAYS } from '../../enums/calendar.enum';

interface AgendaContentProps {
  events: CalendarEvent[];
  date: Date;
}

export const AgendaContent = ({ events, date }: AgendaContentProps) => {
  const weekEvents = useMemo(() => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const endOfWeekDate = new Date(startOfWeek);
    endOfWeekDate.setDate(startOfWeek.getDate() + 6);

    return events.filter((event) => event.start >= startOfWeek && event.start <= endOfWeekDate);
  }, [events, date]);

  return (
    <div className="flex flex-col w-full">
      {WEEK_DAYS.map((day, index) => {
        const currentDay = new Date(date);
        currentDay.setDate(date.getDate() - date.getDay() + index);

        return (
          <div
            key={day}
            className={`${index !== WEEK_DAYS.length - 1 ? 'border-b border-border' : ''}`}
          >
            <div className="flex w-full px-3 py-4 gap-6">
              <div className="flex items-center w-[15%] gap-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${isToday(currentDay) && ' bg-primary'}`}
                >
                  <p
                    className={`text-base font-semibold ${isToday(currentDay) ? 'text-white' : 'text-high-emphasis'}`}
                  >
                    {currentDay.getDate()}
                  </p>
                </div>
                <p className="text-sm font-normal text-high-emphasis">
                  {format(currentDay, 'MMM, EEE')}
                </p>
              </div>
              <div className="flex flex-col w-[75%] gap-2">
                {weekEvents
                  .filter((event) => isSameDay(event.start, currentDay))
                  .map((event, index) => (
                    <div key={index} className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full ring-1 ring-neutral-100 bg-${event.color}`}
                        />
                        <p className="font-normal text-sm text-high-emphasis">
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                        </p>
                      </div>
                      <p className="font-bold text-sm text-high-emphasis">{event.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

AgendaContent.title = (date: Date) => {
  return format(date, 'MMMM yyyy');
};

AgendaContent.navigate = (date: Date, action: 'PREV' | 'NEXT') => {
  const newDate = new Date(date);
  newDate.setDate(action === 'PREV' ? date.getDate() - 7 : date.getDate() + 7);
  return newDate;
};
