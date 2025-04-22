import { useState, useRef, useLayoutEffect, useMemo, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'components/ui/form';
import { Input } from 'components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
  Close as PopoverClose,
} from 'components/ui/popover';
import { Separator } from 'components/ui/separator';
import { Switch } from 'components/ui/switch';
import { Calendar } from 'components/ui/calendar';
import { Label } from 'components/ui/label';
import { ColorPickerTool } from '../color-picker-tool/color-picker-tool';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { AddEventFormValues } from '../../utils/form-schema';
import { EventParticipant } from '../event-participant/event-participant';
import { CalendarEvent } from '../../types/calendar-event.types';
import { useCalendarSettings } from '../../contexts/calendar-settings.context';

export interface EventFormProps {
  form: UseFormReturn<AddEventFormValues>;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  recurringEvents?: CalendarEvent[];
  handleRecurrenceClick: () => void;
  recurrenceText: ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function EventForm({
  form,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedColor,
  setSelectedColor,
  handleRecurrenceClick,
  recurrenceText,
  onSubmit,
  onCancel,
  onDelete,
}: EventFormProps) {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState(0);
  const [endWidth, setEndWidth] = useState(0);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);

  const { settings } = useCalendarSettings();
  const timePickerRange = useMemo(
    () => generateTimePickerRange(settings.defaultDuration),
    [settings.defaultDuration]
  );

  useLayoutEffect(() => {
    const update = () => {
      if (startRef.current) setStartWidth(startRef.current.offsetWidth);
      if (endRef.current) setEndWidth(endRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isAllDay = form.watch('allDay');

  return (
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
            <EventParticipant selected={field.value ?? []} onChange={field.onChange} />
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
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                  </PopoverContent>
                </Popover>
              </div>
              {!isAllDay && (
                <div className="flex flex-col gap-[6px]">
                  <Label className="font-normal text-sm">Start time</Label>
                  <Popover
                    modal={true}
                    open={isStartTimeOpen}
                    onOpenChange={(open) => {
                      setIsStartTimeOpen(open);
                      if (open && startRef.current) setStartWidth(startRef.current.offsetWidth);
                    }}
                  >
                    <PopoverAnchor asChild>
                      <div ref={startRef} className="relative w-full">
                        <Input
                          type="time"
                          step="60"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                        <PopoverTrigger asChild>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                      </div>
                    </PopoverAnchor>
                    <PopoverContent
                      sideOffset={4}
                      align="start"
                      className="max-h-60 overflow-auto p-1 bg-popover shadow-md rounded-md"
                      style={
                        startWidth > 0 ? { width: startWidth, boxSizing: 'border-box' } : undefined
                      }
                    >
                      {timePickerRange.map((time) => (
                        <PopoverClose asChild key={time}>
                          <div
                            onClick={() => setStartTime(time)}
                            className="cursor-pointer px-3 py-1 hover:bg-accent hover:text-accent-foreground"
                          >
                            {time}
                          </div>
                        </PopoverClose>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              )}
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
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                  </PopoverContent>
                </Popover>
              </div>
              {!isAllDay && (
                <div className="flex flex-col gap-[6px]">
                  <Label className="font-normal text-sm">End time</Label>
                  <Popover
                    modal={true}
                    open={isEndTimeOpen}
                    onOpenChange={(open) => {
                      setIsEndTimeOpen(open);
                      if (open && endRef.current) setEndWidth(endRef.current.offsetWidth);
                    }}
                  >
                    <PopoverAnchor asChild>
                      <div ref={endRef} className="relative w-full">
                        <Input
                          type="time"
                          step="60"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                        <PopoverTrigger asChild>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                      </div>
                    </PopoverAnchor>
                    <PopoverContent
                      sideOffset={4}
                      align="start"
                      className="max-h-60 overflow-auto p-1 bg-popover shadow-md rounded-md"
                      style={
                        endWidth > 0 ? { width: endWidth, boxSizing: 'border-box' } : undefined
                      }
                    >
                      {timePickerRange.map((time) => (
                        <PopoverClose asChild key={time}>
                          <div
                            onClick={() => setEndTime(time)}
                            className="cursor-pointer px-3 py-1 hover:bg-accent hover:text-accent-foreground"
                          >
                            {time}
                          </div>
                        </PopoverClose>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              )}
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
                <a
                  onClick={handleRecurrenceClick}
                  className="underline text-primary text-base cursor-pointer font-semibold hover:text-primary-800"
                >
                  {recurrenceText}
                </a>
              </div>
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-high-emphasis">Description</p>
              <div className="flex flex-col flex-1">
                <CustomTextEditor value={field.value} onChange={field.onChange} showIcons={false} />
              </div>
              {fieldState.error && (
                <span className="text-xs text-destructive">{fieldState.error.message}</span>
              )}
            </div>
          )}
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base text-high-emphasis">Colors</p>
          <ColorPickerTool
            selectedColor={selectedColor}
            onColorChange={(color) => setSelectedColor(color)}
          />
        </div>
        <div className={`flex ${onDelete ? 'justify-between' : 'justify-end'} w-full gap-4 !mt-6`}>
          {onDelete && (
            <Button variant="outline" size="icon" onClick={onDelete}>
              <Trash className="w-5 h-4 text-destructive" />
            </Button>
          )}
          <div className="flex gap-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Discard
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

// Import a utility function that was used in the original components
function generateTimePickerRange(intervalMinutes = 30) {
  const times = [];
  const totalMinutesInDay = 24 * 60;

  for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    times.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
  }

  return times;
}
