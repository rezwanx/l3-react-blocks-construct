import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarClock, CalendarIcon } from 'lucide-react';
import { useToast } from 'hooks/use-toast';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'components/ui/dialog';
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
import { ColorPickerTool } from '../../color-picker-tool/color-picker-tool';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { timePickerRange } from '../../../utils/date-utils';
import { EventParticipant } from '../../event-participant/event-participant';
import { Member } from '../../../types/calendar-event.types';
import { members } from '../../../services/calendar-services';

type FinalAddEventFormValues = Omit<AddEventFormValues, 'members'> & {
  members: Member[];
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

  const handleFormSubmit = (data: AddEventFormValues) => {
    if (!startDate || !endDate) return;

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

    const payload: FinalAddEventFormValues = {
      ...data,
      start: fullStart.toISOString(),
      end: fullEnd.toISOString(),
      meetingLink: data.meetingLink,
      color: selectedColor,
      allDay: data.allDay,
      recurring: data.recurring,
      description: data.description,
      members: selectedMembers,
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
    onCancel();
  };

  return (
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
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
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
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
                  <a className="underline text-primary text-base cursor-pointer font-semibold hover:text-primary-800">
                    Occurs every Monday
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
                  <CustomTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    showIcons={false}
                  />
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
          <div className="flex justify-end w-full gap-4 !mt-6">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Discard
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
