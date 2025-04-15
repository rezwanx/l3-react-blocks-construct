import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, format, startOfDay } from 'date-fns';
import { CalendarClock, CalendarIcon, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'components/ui/form';
import { Input } from 'components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from 'components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Separator } from 'components/ui/separator';
import { Switch } from 'components/ui/switch';
import { Calendar } from 'components/ui/calendar';
import { Label } from 'components/ui/label';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { useToast } from 'hooks/use-toast';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { ColorPickerTool } from '../../color-picker-tool/color-picker-tool';
import { timePickerRange } from '../../../utils/date-utils';
import { CalendarEvent, Member } from '../../../types/calendar-event.types';
import { EventParticipant } from '../../event-participant/event-participant';
import { members } from '../../../services/calendar-services';

interface EditEventProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
  onUpdate: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
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
  const [startDate, setStartDate] = useState<Date>(event.start);
  const [endDate, setEndDate] = useState<Date>(event.end);
  const [startTime, setStartTime] = useState(() => format(event.start, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(event.end, 'HH:mm'));
  const [editorContent, setEditorContent] = useState(event.resource?.description ?? '');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      meetingLink: event.resource?.meetingLink,
      start: event.start.toISOString().slice(0, 16),
      end: event.end.toISOString().slice(0, 16),
      allDay: event.allDay ?? false,
      color: event.resource?.color ?? '',
      description: event.resource?.description ?? '',
      recurring: event.resource?.recurring ?? false,
      members: event.resource?.members ? event.resource.members.map((m) => m.id) : [],
    },
  });

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
        [...members, ...(event.resource?.members ?? [])]?.find((member) => member.id === id)
      )
      .filter((member): member is Member => Boolean(member));

    const updatedEvent: CalendarEvent = {
      ...event,
      title: data.title,
      start: startDateTime,
      end: endDateTime,
      allDay: data.allDay,
      resource: {
        meetingLink: data.meetingLink ?? '',
        color: data.color ?? '',
        description: editorContent,
        recurring: data.recurring,
        members: selectedMembers,
      },
    };

    onUpdate(updatedEvent);
    onClose();
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(event.eventId ?? '');
    setShowDeleteDialog(false);
    onClose();
    toast({
      variant: 'success',
      title: 'Event Deleted Successfully',
      description: `The event titled "${event.title}" has been successfully deleted.`,
    });
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-sm">Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meetingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-sm">Meeting Link*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your meeting link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <EventParticipant
                    selected={field.value ?? []}
                    editMembers={event.resource?.members}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="flex gap-4 w-full sm:w-[60%]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-[6px]">
                      <Label className="font-normal text-sm">Start date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="relative">
                            <Input
                              readOnly
                              value={startDate ? format(startDate, 'dd.MM.yyyy') : ''}
                              className="cursor-pointer"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(day) => setStartDate(day || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <Label className="font-normal text-sm">Start time</Label>
                      <Select value={startTime} onValueChange={setStartTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timePickerRange.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <Label className="font-normal text-sm">End date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="relative">
                            <Input
                              readOnly
                              value={endDate ? format(endDate, 'dd.MM.yyyy') : ''}
                              className="cursor-pointer"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(day) => setEndDate(day || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <Label className="font-normal text-sm">End time</Label>
                      <Select value={endTime} onValueChange={setEndTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timePickerRange.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Separator orientation="vertical" className="hidden sm:flex" />
                <div className="flex flex-col w-full sm:w-[40%] gap-4">
                  <FormField
                    control={form.control}
                    name="allDay"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <Label>All day</Label>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <Label>Recurring Event</Label>
                      </div>
                    )}
                  />
                  {form.watch('recurring') && (
                    <div className="flex items-center gap-4">
                      <CalendarClock className="w-5 h-5 text-medium-emphasis" />
                      <a
                        onClick={onNext}
                        className="underline text-primary text-base cursor-pointer font-semibold hover:text-primary-800"
                      >
                        Occurs every Monday
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-base text-high-emphasis">Description</p>
                <div className="flex flex-col flex-1">
                  <CustomTextEditor
                    value={editorContent}
                    onChange={setEditorContent}
                    showIcons={false}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-base text-high-emphasis">Colors</p>
                    <ColorPickerTool selectedColor={field.value} onColorChange={field.onChange} />
                  </div>
                )}
              />
              <div className="flex w-full items-center justify-between gap-4 mt-6">
                <Button variant="outline" size="icon" type="button" onClick={handleDeleteClick}>
                  <Trash className="w-5 h-4 text-destructive" />
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" type="button" onClick={onClose}>
                    Discard
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Event"
        description={`Are you sure you want to delete the event: "${event.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
