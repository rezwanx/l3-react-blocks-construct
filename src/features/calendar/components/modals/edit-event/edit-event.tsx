import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, format, startOfDay } from 'date-fns';
import { CalendarClock, CalendarIcon, Plus, Search, Trash } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Separator } from 'components/ui/separator';
import { Switch } from 'components/ui/switch';
import { Calendar } from 'components/ui/calendar';
import { Label } from 'components/ui/label';
import { Checkbox } from 'components/ui/checkbox';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from 'components/ui/menubar';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { ColorPickerTool } from '../../color-picker-tool/color-picker-tool';
import { timePickerRange } from '../../../utils/date-utils';
import { CalendarEvent } from '../../../types/calendar-event.types';

interface EditEventProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
  onUpdate: (event: CalendarEvent) => void;
}

export function EditEvent({ event, onClose, onNext, onUpdate }: Readonly<EditEventProps>) {
  const [startDate, setStartDate] = useState<Date>(event.start);
  const [endDate, setEndDate] = useState<Date>(event.end);
  const [startTime, setStartTime] = useState(() => format(event.start, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(event.end, 'HH:mm'));
  const [allDay, setAllDay] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      meetingLink: event.meetingLink,
      start: event.start.toISOString().slice(0, 16),
      end: event.end.toISOString().slice(0, 16),
      color: event.color || '',
    },
  });

  const onSubmit = (data: AddEventFormValues) => {
    const startDateTime = allDay
      ? startOfDay(startDate || new Date())
      : new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const endDateTime = allDay
      ? endOfDay(endDate || new Date())
      : new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);

    const updatedEvent: CalendarEvent = {
      ...event,
      title: data.title,
      meetingLink: data.meetingLink,
      start: startDateTime,
      end: endDateTime,
      allDay: allDay,
      color: selectedColor ?? '',
    };

    onUpdate(updatedEvent);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[720px]">
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
            <div className="flex flex-col gap-3">
              <p className="text-base text-high-emphasis font-semibold">Participants</p>
              <div className="flex items-center gap-2">
                <Avatar className="ring-2 ring-neutral-50 shadow-md">
                  <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Menubar className="border-none">
                  <MenubarMenu>
                    <MenubarTrigger asChild>
                      <Button variant="outline" size="icon" className="border-dashed">
                        <Plus className="w-5 h-5 text-high-emphasis" />
                      </Button>
                    </MenubarTrigger>
                    <MenubarContent className="flex flex-col gap-6 py-2 px-3">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-base text-high-emphasis">Members</p>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                          <Input
                            placeholder="Search members"
                            className="h-10 w-full rounded-lg bg-surface border-none pl-8"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]" />
                          <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                            <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <label
                            htmlFor="member1"
                            className="text-sm font-normal text-high-emphasis"
                          >
                            Aaron Green
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]" />
                          <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                            <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <label
                            htmlFor="member1"
                            className="text-sm font-normal text-high-emphasis"
                          >
                            Aaron Green
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]" />
                          <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                            <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <label
                            htmlFor="member1"
                            className="text-sm font-normal text-high-emphasis"
                          >
                            Aaron Green
                          </label>
                        </div>
                      </div>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
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
              <div className="flex flex-col w-[40%] gap-4">
                <div className="flex items-center gap-4">
                  <Switch checked={allDay} onCheckedChange={setAllDay} />
                  <Label>All day</Label>
                </div>
                <div className="flex items-center gap-4">
                  <Switch checked={recurring} onCheckedChange={setRecurring} />
                  <Label>Recurring Event</Label>
                </div>
                {recurring && (
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
              <p>Rich text editor here</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-high-emphasis">Colors</p>
              <ColorPickerTool
                selectedColor={selectedColor}
                onColorChange={(color) => setSelectedColor(color)}
              />
            </div>
            <div className="flex w-full !items-center !justify-between gap-4 !mt-6">
              <Button variant="outline" size="icon">
                <Trash className="!w-5 !h-4 text-destructive" />
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
  );
}
