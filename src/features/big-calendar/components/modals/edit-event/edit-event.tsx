import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, format, startOfDay } from 'date-fns';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from 'components/ui/dialog';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { useToast } from 'hooks/use-toast';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { CalendarEvent, Member } from '../../../types/calendar-event.types';
import { members } from '../../../services/calendar-services';
import { DeleteRecurringEvent } from '../delete-recurring-event/delete-recurring-event';
import { EventForm } from '../../event-form/event-form';

type DeleteOption = 'this' | 'thisAndFollowing' | 'all';

interface EditEventProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
  onUpdate: (event: CalendarEvent) => void;
  onDelete: (eventId: string, deleteOption?: DeleteOption) => void;
}

/**
 * EditEvent Component
 *
 * A comprehensive form modal for editing a calendar event.
 * It uses `react-hook-form` with Zod schema validation, and allows users to update event metadata,
 * including title, time range, recurrence, participants, colors, and description.
 *
 * Features:
 * - Date and time pickers for start and end
 * - All-day and recurring event toggles
 * - Meeting link input
 * - Rich text editor for description
 * - Member selection
 * - Color tagging
 * - Delete confirmation modal
 * - Controlled modal with save and discard options
 *
 * Props:
 * @param {CalendarEvent} event - The calendar event to edit
 * @param {() => void} onClose - Callback for closing the dialog
 * @param {() => void} onNext - Callback triggered for recurrence configuration
 * @param {(event: CalendarEvent) => void} onUpdate - Callback to update the event with new data
 * @param {(eventId: string) => void} onDelete - Callback to delete the event by ID
 *
 * @returns {JSX.Element} Edit event modal dialog with form fields and action buttons
 *
 * @example
 * <EditEvent
 *   event={selectedEvent}
 *   onClose={() => setShowModal(false)}
 *   onNext={() => handleRecurrenceConfig()}
 *   onUpdate={updateEventInState}
 *   onDelete={deleteEventById}
 * />
 */
export function EditEvent({
  event,
  onClose,
  onNext,
  onUpdate,
  onDelete,
}: Readonly<EditEventProps>) {
  const { toast } = useToast();
  const [initialEventData] = useState<CalendarEvent>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('tempEditEvent');
      if (saved) {
        const parsed = JSON.parse(saved) as CalendarEvent;
        return {
          ...parsed,
          start: new Date(parsed.start),
          end: new Date(parsed.end),
          events: parsed.events
            ? parsed.events.map((evt) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
              }))
            : [],
          resource: {
            ...parsed.resource,
          },
        } as CalendarEvent;
      }
    }
    return event;
  });
  const parsedStart = useMemo(
    () =>
      initialEventData.start instanceof Date
        ? initialEventData.start
        : new Date(initialEventData.start as string),
    [initialEventData.start]
  );
  const parsedEnd = useMemo(
    () =>
      initialEventData.end instanceof Date
        ? initialEventData.end
        : new Date(initialEventData.end as string),
    [initialEventData.end]
  );
  const [startDate, setStartDate] = useState<Date>(parsedStart);
  const [endDate, setEndDate] = useState<Date>(parsedEnd);
  const [startTime, setStartTime] = useState(() => format(parsedStart, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(parsedEnd, 'HH:mm'));
  const [editorContent, setEditorContent] = useState(initialEventData.resource?.description ?? '');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRecurringDeleteDialog, setShowRecurringDeleteDialog] = useState(false);
  const [recurringEvents, setRecurringEvents] = useState<CalendarEvent[]>(
    initialEventData.events || []
  );

  useEffect(() => {
    if (initialEventData.resource?.recurring) {
      const tempEdit = window.localStorage.getItem('tempEditEvent');
      if (tempEdit) {
        try {
          const parsedEdit = JSON.parse(tempEdit) as CalendarEvent;
          if (parsedEdit.events && parsedEdit.events.length > 1) {
            setRecurringEvents(
              parsedEdit.events.map((evt) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
              }))
            );
            return;
          }
        } catch (error) {
          console.error('Error parsing tempEditEvent', error);
        }
      }
      const tempSeries = window.localStorage.getItem('tempRecurringEvents');
      if (tempSeries) {
        try {
          const parsedData = JSON.parse(tempSeries as string);
          
          // Check if we're dealing with the new format (pattern info) or old format (event array)
          if (parsedData.events) {
            // New format with pattern info and events array
            setRecurringEvents(
              parsedData.events.map((evt: any) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
                resource: {
                  ...evt.resource,
                  description: initialEventData.resource?.description || '',
                },
              }))
            );
          } else {
            // Old format with just events array
            setRecurringEvents(
              parsedData.map((evt: any) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
              }))
            );
          }
        } catch (error) {
          console.error('Error parsing tempRecurringEvents', error);
        }
      }
    }
  }, [initialEventData.resource?.recurring, initialEventData.resource?.description]);

  useEffect(() => {
    if (
      initialEventData.resource?.recurring &&
      (!initialEventData.events || initialEventData.events.length <= 1)
    ) {
      const tempSeries = window.localStorage.getItem('tempRecurringEvents');
      if (tempSeries) {
        try {
          const parsedData = JSON.parse(tempSeries as string);
          
          // Check if we're dealing with the new format (pattern info) or old format (event array)
          if (parsedData.events) {
            // New format with pattern info and events array
            setRecurringEvents(
              parsedData.events.map((evt: any) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
                resource: {
                  ...evt.resource,
                  description: initialEventData.resource?.description || '',
                },
              }))
            );
          } else {
            // Old format with just events array
            setRecurringEvents(
              parsedData.map((evt: any) => ({
                ...evt,
                start: new Date(evt.start),
                end: new Date(evt.end),
              }))
            );
          }
        } catch (error) {
          console.error('Error parsing tempRecurringEvents', error);
        }
      }
    }
  }, [initialEventData.resource?.recurring, initialEventData.events, initialEventData.resource?.description]);

  const recurrenceText = useMemo(() => {
    if (!initialEventData.resource?.recurring) return '';
    const evts = recurringEvents.length > 0 ? recurringEvents : initialEventData.events || [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (evts.length === 0) {
      return `Occurs on ${dayNames[parsedStart.getDay()]}`;
    }
    const abbrs = Array.from(
      new Set(evts.map((e) => dayNames[new Date(e.start).getDay()].substring(0, 3)))
    );
    if (abbrs.length === 1) {
      return `Occurs on ${abbrs[0]}`;
    }
    const last = abbrs.pop();
    return `Occurs on ${abbrs.join(', ')} and ${last}`;
  }, [recurringEvents, initialEventData, parsedStart]);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialEventData.title,
      meetingLink: initialEventData.resource?.meetingLink,
      start: parsedStart.toISOString().slice(0, 16),
      end: parsedEnd.toISOString().slice(0, 16),
      allDay: initialEventData.allDay ?? false,
      color: initialEventData.resource?.color ?? '',
      description: initialEventData.resource?.description ?? '',
      recurring: initialEventData.resource?.recurring ?? false,
      members: initialEventData.resource?.members
        ? initialEventData.resource.members.map((m) => m.id)
        : [],
    },
  });

  const handleClose = () => {
    window.localStorage.removeItem('tempEditEvent');
    window.localStorage.removeItem('tempRecurringEvents');
    onClose();
  };

  useEffect(() => {
    // Check for saved data in localStorage again (in case it was updated after initialEventData was set)
    const savedEventData = window.localStorage.getItem('tempEditEvent');
    let tempEvents: CalendarEvent[] = [];

    if (savedEventData) {
      try {
        const parsed = JSON.parse(savedEventData);
        const parsedSavedStart = new Date(parsed.start);
        const parsedSavedEnd = new Date(parsed.end);

        // Reset form with all saved values
        form.reset({
          title: parsed.title,
          meetingLink: parsed.resource?.meetingLink || '',
          start: parsedSavedStart.toISOString().slice(0, 16),
          end: parsedSavedEnd.toISOString().slice(0, 16),
          allDay: parsed.allDay ?? false,
          color: parsed.resource?.color ?? '',
          description: parsed.resource?.description ?? '',
          recurring: parsed.resource?.recurring ?? false,
          members: parsed.resource?.members ? parsed.resource.members.map((m: Member) => m.id) : [],
        });

        // Update other state values
        setStartDate(parsedSavedStart);
        setEndDate(parsedSavedEnd);
        setStartTime(format(parsedSavedStart, 'HH:mm'));
        setEndTime(format(parsedSavedEnd, 'HH:mm'));
        // Make sure to update editorContent with the description from localStorage
        setEditorContent(parsed.resource?.description ?? '');
        
        // If we have the new format with hasRecurringEvents flag
        if (parsed.hasRecurringEvents) {
          // We don't need to load the events from tempEditEvent anymore
          // as they will be loaded from tempRecurringEvents
          // This is part of our optimization to reduce localStorage usage
        } else if (parsed.events) {
          // Handle old format with events directly in the object
          tempEvents = parsed.events.map((evt: any) => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end),
          }));
        }
      } catch (error) {
        console.error('Error parsing tempEditEvent', error);
      }
    }
    
    // Load recurring events from localStorage if needed
    if (tempEvents.length < 2) {
      const tempRec = window.localStorage.getItem('tempRecurringEvents');
      if (tempRec) {
        try {
          const parsedData = JSON.parse(tempRec);
          
          // Check if we're dealing with the new format (pattern info) or old format (event array)
          let eventsArray;
          if (parsedData.events) {
            // New format with pattern info and events array
            eventsArray = parsedData.events;
          } else if (Array.isArray(parsedData)) {
            // Old format with just events array
            eventsArray = parsedData;
          } else {
            // Fallback if data structure is unexpected
            console.error('Unexpected data structure in tempRecurringEvents');
            eventsArray = [];
          }
          
          tempEvents = eventsArray.map((evt: any) => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end),
            resource: {
              ...evt.resource,
              description: initialEventData.resource?.description || '',
            },
          }));
        } catch (error) {
          console.error('Error parsing tempRecurringEvents', error);
        }
      }
    }
    
    // Set the recurring events if we have any
    if (tempEvents.length > 0) {
      setRecurringEvents(tempEvents);
    } else {
      // If no saved data, reset form to initial values
      form.reset({
        title: initialEventData.title,
        meetingLink: initialEventData.resource?.meetingLink || '',
        start: parsedStart.toISOString().slice(0, 16),
        end: parsedEnd.toISOString().slice(0, 16),
        allDay: initialEventData.allDay ?? false,
        color: initialEventData.resource?.color ?? '',
        description: initialEventData.resource?.description ?? '',
        recurring: initialEventData.resource?.recurring ?? false,
        members:
          (initialEventData.resource?.members
            ? initialEventData.resource.members.map((m) => m.id)
            : []) || [],
      });

      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setStartTime(format(parsedStart, 'HH:mm'));
      setEndTime(format(parsedEnd, 'HH:mm'));
      setEditorContent(initialEventData.resource?.description ?? '');
    }
  }, [initialEventData, form, parsedStart, parsedEnd]);

  const onSubmit = (data: AddEventFormValues) => {
    const memberIds: string[] = data.members ?? [];

    const startDateTime = data.allDay
      ? startOfDay(startDate)
      : new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const endDateTime = data.allDay
      ? endOfDay(endDate)
      : new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);

    const selectedMembers: Member[] = memberIds
      .map((id) =>
        [...members, ...(initialEventData.resource?.members ?? [])]?.find(
          (member) => member.id === id
        )
      )
      .filter((member): member is Member => Boolean(member));

    const tempRecurringEvents = window.localStorage.getItem('tempRecurringEvents');

    let updatedEvent: CalendarEvent;

    if (data.recurring) {
      if (tempRecurringEvents) {
        // If we have recurring events from the recurrence modal, use those
        const parsedData = JSON.parse(tempRecurringEvents);
        
        // Check if we're dealing with the new format (pattern info) or old format (event array)
        let eventsArray;
        if (parsedData.events) {
          // New format with pattern info and events array
          eventsArray = parsedData.events;
        } else if (Array.isArray(parsedData)) {
          // Old format with just events array
          eventsArray = parsedData;
        } else {
          // Fallback if data structure is unexpected
          console.error('Unexpected data structure in tempRecurringEvents');
          eventsArray = [];
        }

        const processedRecurringEvents = eventsArray.map((evt: any) => ({
          ...evt,
          title: data.title,
          start: evt.start instanceof Date ? evt.start : new Date(evt.start),
          end: evt.end instanceof Date ? evt.end : new Date(evt.end),
          allDay: data.allDay,
          resource: {
            meetingLink: data.meetingLink ?? '',
            description: editorContent,
            color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
            recurring: true,
            members: selectedMembers,
          },
        }));

        updatedEvent = {
          ...initialEventData,
          title: data.title,
          start: startDateTime,
          end: endDateTime,
          allDay: data.allDay,
          events: processedRecurringEvents,
          resource: {
            meetingLink: data.meetingLink ?? '',
            color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
            description: editorContent,
            recurring: true,
            patternChanged: true,
            members: selectedMembers,
          },
        };
      } else if (
        initialEventData.resource?.recurring &&
        initialEventData.events &&
        initialEventData.events.length > 0
      ) {
        const eventDuration = endDateTime.getTime() - startDateTime.getTime();
        const originalBaseStart =
          initialEventData.start instanceof Date
            ? initialEventData.start
            : new Date(initialEventData.start as string);
        const processedRecurringEvents = initialEventData.events.map((evt) => {
          const offset = evt.start.getTime() - originalBaseStart.getTime();
          const newStart = new Date(startDateTime.getTime() + offset);
          const newEnd = new Date(newStart.getTime() + eventDuration);
          return {
            ...evt,
            title: data.title,
            start: newStart,
            end: newEnd,
            allDay: data.allDay,
            resource: {
              meetingLink: data.meetingLink ?? '',
              color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
              description: editorContent,
              recurring: true,
              patternChanged: false,
              members: selectedMembers,
            },
          } as CalendarEvent;
        });
        updatedEvent = {
          ...initialEventData,
          title: data.title,
          start: startDateTime,
          end: endDateTime,
          allDay: data.allDay,
          events: processedRecurringEvents,
          resource: {
            meetingLink: data.meetingLink ?? '',
            color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
            description: editorContent,
            recurring: true,
            patternChanged: false,
            members: selectedMembers,
          },
        };
      } else {
        const defaultRecurringEvents = [];

        const baseEvent = {
          eventId: initialEventData.eventId,
          title: data.title,
          start: startDateTime,
          end: endDateTime,
          allDay: data.allDay,
          resource: {
            meetingLink: data.meetingLink ?? '',
            color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
            description: editorContent,
            recurring: true,
            members: selectedMembers,
          },
        };

        // Add the first occurrence (original event)
        defaultRecurringEvents.push(baseEvent);

        // Add 3 more weekly occurrences by default
        for (let i = 1; i <= 3; i++) {
          const newStart = new Date(startDateTime);
          newStart.setDate(newStart.getDate() + i * 7);

          const newEnd = new Date(endDateTime);
          newEnd.setDate(newEnd.getDate() + i * 7);

          defaultRecurringEvents.push({
            ...baseEvent,
            eventId: crypto.randomUUID(),
            start: newStart,
            end: newEnd,
            resource: {
              ...baseEvent.resource,
              description: editorContent,
            },
          });
        }

        updatedEvent = {
          ...initialEventData,
          title: data.title,
          start: startDateTime,
          end: endDateTime,
          allDay: data.allDay,
          events: defaultRecurringEvents,
          resource: {
            meetingLink: data.meetingLink ?? '',
            color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
            description: editorContent,
            recurring: true,
            patternChanged: false,
            members: selectedMembers,
          },
        };
      }
      window.localStorage.removeItem('tempEditEvent');
      window.localStorage.removeItem('tempRecurringEvents');
    } else {
      // Non-recurring event
      updatedEvent = {
        ...initialEventData,
        title: data.title,
        start: startDateTime,
        end: endDateTime,
        allDay: data.allDay,
        events: undefined,
        resource: {
          meetingLink: data.meetingLink ?? '',
          color: data.color || initialEventData.resource?.color || 'hsl(var(--primary-500))',
          description: editorContent,
          recurring: false,
          patternChanged: undefined,
          members: selectedMembers,
        },
      };
    }

    const finalUpdatedEvent = {
      ...updatedEvent,
      start: updatedEvent.start instanceof Date ? updatedEvent.start : new Date(updatedEvent.start),
      end: updatedEvent.end instanceof Date ? updatedEvent.end : new Date(updatedEvent.end),
      events: updatedEvent.events
        ? updatedEvent.events.map((evt) => ({
            ...evt,
            start: evt.start instanceof Date ? evt.start : new Date(evt.start),
            end: evt.end instanceof Date ? evt.end : new Date(evt.end),
            resource: {
              ...evt.resource,
              description: editorContent,
            },
          }))
        : undefined,
    };

    window.localStorage.removeItem('tempEditEvent');
    window.localStorage.removeItem('tempRecurringEvents');

    onUpdate(finalUpdatedEvent);
    onClose();
  };

  const handleDeleteClick = () => {
    if (initialEventData.resource?.recurring) {
      setShowRecurringDeleteDialog(true);
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(initialEventData.eventId ?? '');
    onClose();
    setShowDeleteDialog(false);
    toast({
      variant: 'success',
      title: 'Event Deleted Successfully',
      description: 'The event has been removed from your calendar.',
    });
  };

  const handleRecurringDeleteConfirm = (deleteOption: DeleteOption) => {
    onDelete(initialEventData.eventId ?? '', deleteOption);
    onClose();
    setShowRecurringDeleteDialog(false);
    toast({
      variant: 'success',
      title: 'Recurring Event Deleted',
      description: 'The recurring event has been removed from your calendar.',
    });
  };

  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialEventData.resource?.color ?? null
  );

  // Wrap setters to match EventFormProps expected signature
  const handleStartDateChange = (date: Date | undefined) => {
    if (date) setStartDate(date);
  };
  const handleEndDateChange = (date: Date | undefined) => {
    if (date) setEndDate(date);
  };

  // This effect ensures the form's description field is synchronized with editorContent
  useEffect(() => {
    form.setValue('description', editorContent);
  }, [editorContent, form]);

  const handleRecurrenceClick = () => {
    const memberIds = form.getValues('members') ?? [];
    const selectedMembers: Member[] = memberIds
      .map((id) =>
        [...members, ...(initialEventData.resource?.members ?? [])].find(
          (member) => member.id === id
        )
      )
      .filter((m): m is Member => Boolean(m));
    
    try {
      // Get the current description from the form - this ensures we capture any edits
      const currentDescription = form.getValues('description');
      
      // Create a minimal version of the event with only essential data
      const minimalEvent = {
        eventId: initialEventData.eventId,
        title: form.getValues('title') || initialEventData.title,
        start: (form.getValues('allDay')
          ? startOfDay(startDate)
          : new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`)).toISOString(),
        end: (form.getValues('allDay')
          ? endOfDay(endDate)
          : new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`)).toISOString(),
        allDay: form.getValues('allDay'),
        resource: {
          meetingLink: form.getValues('meetingLink') || '',
          description: currentDescription, // Use the current description from the form
          color: selectedColor ?? initialEventData.resource?.color ?? 'hsl(var(--primary-500))',
          recurring: true,
          // Store only the member IDs to reduce storage size
          members: selectedMembers
        },
        // Don't include all recurring events, just store a flag indicating there are some
        hasRecurringEvents: recurringEvents && recurringEvents.length > 0
      };
      
      // Update editorContent to match the form value before navigating away
      setEditorContent(currentDescription);
      
      window.localStorage.setItem('tempEditEvent', JSON.stringify(minimalEvent));
      onNext();
    } catch (error) {
      console.error('Error saving event data:', error);
      // If we can't save to localStorage, continue anyway
      onNext();
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent
          className="w-full sm:max-w-[720px] max-h-[96vh] overflow-y-auto"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <EventForm
            form={form}
            startDate={startDate}
            setStartDate={handleStartDateChange}
            endDate={endDate}
            setEndDate={handleEndDateChange}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            selectedColor={selectedColor}
            setSelectedColor={(c) => {
              setSelectedColor(c);
              form.setValue('color', c || '');
            }}
            recurringEvents={recurringEvents}
            handleRecurrenceClick={handleRecurrenceClick}
            recurrenceText={recurrenceText}
            onSubmit={form.handleSubmit(onSubmit)}
            onCancel={handleClose}
            onDelete={handleDeleteClick}
          />
        </DialogContent>
      </Dialog>

      {!initialEventData.resource?.recurring && (
        <ConfirmationModal
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="Delete Event"
          description={
            <>
              Are you sure you want to delete <strong>{initialEventData.title}</strong>?
            </>
          }
          onConfirm={handleDeleteConfirm}
        />
      )}

      {initialEventData.resource?.recurring && (
        <DeleteRecurringEvent
          open={showRecurringDeleteDialog}
          onOpenChange={setShowRecurringDeleteDialog}
          eventTitle={initialEventData.title}
          onConfirm={handleRecurringDeleteConfirm}
        />
      )}
    </>
  );
}
