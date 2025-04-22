import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useToast } from 'hooks/use-toast';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'components/ui/dialog';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { CalendarEvent, Member } from '../../../types/calendar-event.types';
import { members } from '../../../services/calendar-services';
import { WEEK_DAYS_FULL } from '../../../constants/calendar.constants';
import { EditRecurrence } from '../edit-recurrence/edit-recurrence';
import { EventForm } from '../../event-form/event-form';

type FinalAddEventFormValues = Omit<AddEventFormValues, 'members'> & {
  members: Member[];
  events?: CalendarEvent[];
};

interface AddEventProps {
  start: Date;
  end: Date;
  onSubmit: (data: FinalAddEventFormValues) => void;
  onCancel: () => void;
}

export function AddEvent({ start, end, onCancel, onSubmit }: Readonly<AddEventProps>) {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);
  const [startTime, setStartTime] = useState(() => format(start, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(end, 'HH:mm'));
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
  const [tempEvent, setTempEvent] = useState<CalendarEvent | null>(null);
  const [recurringEvents, setRecurringEvents] = useState<CalendarEvent[]>([]);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
      meetingLink: '',
      color: '',
      allDay: false,
      recurring: false,
      members: [],
      description: '',
    },
  });

  const recurrenceText = useMemo(() => {
    if (recurringEvents.length === 0) {
      const selectedDay = startDate ? WEEK_DAYS_FULL[startDate.getDay()] : WEEK_DAYS_FULL[new Date().getDay()];
      return `Occurs every ${selectedDay}`;
    }

    const uniqueDays = Array.from(
      new Set(recurringEvents.map((e) => WEEK_DAYS_FULL[e.start.getDay()].substring(0, 3)))
    );
    if (uniqueDays.length === 1) return `Occurs every ${uniqueDays[0]}`;
    const last = uniqueDays.splice(uniqueDays.length - 1, 1)[0];
    return `Occurs every ${uniqueDays.join(', ')} and ${last}`;
  }, [recurringEvents, startDate]);

  const handleFormSubmit = () => {
    if (!startDate || !endDate) return;

    const data = form.getValues();
    const memberIds: string[] = data.members ?? [];

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const fullStart = new Date(startDate);
    const fullEnd = new Date(endDate);

    if (!data?.allDay) {
      fullStart.setHours(startHour, startMinute, 0, 0);
      fullEnd.setHours(endHour, endMinute, 0, 0);
    } else {
      fullStart.setHours(0, 0, 0, 0);
      fullEnd.setHours(23, 59, 59, 999);
    }

    if (fullEnd < fullStart) {
      toast({
        variant: 'destructive',
        title: 'Error Selecting time slot',
        description: 'End time cannot be before start time.',
      });
      return;
    }

    const selectedMembers: Member[] = memberIds
      .map((id) => members.find((member) => member.id === id))
      .filter((member): member is Member => Boolean(member));

    let events: CalendarEvent[] | undefined = undefined;

    if (data.recurring && recurringEvents.length > 0) {
      // Use the existing recurring events with updated form data
      events = recurringEvents.map(
        (event): CalendarEvent => ({
          ...event,
          title: data.title,
          resource: {
            ...event.resource,
            description: data.description,
            meetingLink: data.meetingLink,
            color: selectedColor || 'hsl(var(--primary-500))',
          },
        })
      );
    } else if (data.recurring) {
      // Create default weekly recurring events if recurring is true but no events defined
      events = [];
      const baseEvent: CalendarEvent = {
        eventId: crypto.randomUUID(),
        title: data.title,
        start: fullStart,
        end: fullEnd,
        allDay: data.allDay,
        resource: {
          meetingLink: data.meetingLink || '',
          description: data.description || '',
          color: selectedColor || 'hsl(var(--primary-500))',
          recurring: true,
          members: selectedMembers,
        },
      };

      // Add the original event
      events.push(baseEvent);

      // Add 3 more weekly occurrences
      for (let i = 1; i <= 3; i++) {
        const newStart = new Date(fullStart);
        newStart.setDate(newStart.getDate() + i * 7);

        const newEnd = new Date(fullEnd);
        newEnd.setDate(newEnd.getDate() + i * 7);

        events.push({
          ...baseEvent,
          eventId: crypto.randomUUID(),
          start: newStart,
          end: newEnd,
        });
      }
    }

    // Prepare the final payload for both recurring and non-recurring events
    const payload: FinalAddEventFormValues = {
      ...data,
      start: fullStart.toISOString(),
      end: fullEnd.toISOString(),
      meetingLink: data.meetingLink || '',
      color: selectedColor || 'hsl(var(--primary-500))',
      allDay: data.allDay,
      recurring: data.recurring,
      description: data.description || '',
      members: selectedMembers,
      events: events,
    };

    onSubmit(payload);
  };

  const handleCancel = () => {
    form.reset();
    setStartDate(start);
    setEndDate(end);
    setStartTime('');
    setEndTime('');
    setSelectedColor(null);
    setRecurringEvents([]);
    onCancel();
  };

  const handleRecurrenceClick = () => {
    if (!startDate || !endDate) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const fullStart = new Date(startDate);
    const fullEnd = new Date(endDate);

    if (!form.getValues('allDay')) {
      fullStart.setHours(startHour, startMinute, 0, 0);
      fullEnd.setHours(endHour, endMinute, 0, 0);
    } else {
      fullStart.setHours(0, 0, 0, 0);
      fullEnd.setHours(23, 59, 59, 999);
    }

    // Create a temporary event for the recurrence modal
    const tempEventData: CalendarEvent = {
      eventId: crypto.randomUUID(),
      title: form.getValues('title') || 'New Event',
      start: fullStart,
      end: fullEnd,
      allDay: form.getValues('allDay'),
      resource: {
        meetingLink: form.getValues('meetingLink'),
        description: form.getValues('description'),
        color: selectedColor ?? 'hsl(var(--primary-500))',
        recurring: true,
        members:
          (form
            .getValues('members')
            ?.map((id) => members.find((m) => m.id === id))
            .filter(Boolean) as Member[]) || [],
      },
      events: recurringEvents,
    };

    window.localStorage.removeItem('tempEditEvent');
    setTempEvent(tempEventData);
    setShowRecurrenceModal(true);
  };

  const handleRecurrenceClose = () => {
    setShowRecurrenceModal(false);
    setTempEvent(null);

    const tempRecurringEvents = window.localStorage.getItem('tempRecurringEvents');
    if (tempRecurringEvents) {
      try {
        const parsedEvents = JSON.parse(tempRecurringEvents) as CalendarEvent[];
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          const updatedEvents = parsedEvents.map((event) => ({
            ...event,
            resource: {
              ...event.resource,
              description: form.getValues('description'),
              color: selectedColor || event.resource?.color,
            },
          }));
          setRecurringEvents(updatedEvents);
          form.setValue('recurring', true);
        }
      } catch (error) {
        console.error('Error parsing recurring events:', error);
      }
    }
  };

  return (
    <>
      <DialogContent
        className="w-full sm:max-w-[720px] max-h-[96vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <EventForm
          form={form}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          recurringEvents={recurringEvents}
          handleRecurrenceClick={handleRecurrenceClick}
          recurrenceText={recurrenceText}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
      {showRecurrenceModal && tempEvent && (
        <EditRecurrence
          event={tempEvent}
          onNext={handleRecurrenceClose}
          setEvents={(events) => {
            if (Array.isArray(events) && events.length > 0) {
              const processedEvents = events.map((event) => ({
                ...event,
                resource: {
                  ...event.resource,
                  description: form.getValues('description'),
                  color: selectedColor || event.resource?.color || 'hsl(var(--primary-500))',
                },
              }));
              setRecurringEvents(processedEvents);
              form.setValue('recurring', true);
            }
          }}
        />
      )}
    </>
  );
}
