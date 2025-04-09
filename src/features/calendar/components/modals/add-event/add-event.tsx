import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Search } from 'lucide-react';
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
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';

interface AddEventProps {
  start: Date;
  end: Date;
  onSubmit: (data: AddEventFormValues) => void;
  onCancel: () => void;
}

export function AddEvent({ start, end, onSubmit, onCancel }: Readonly<AddEventProps>) {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);
  const [startTime, setStartTime] = useState(() => format(start, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(end, 'HH:mm'));
  const [allDay, setAllDay] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
      meetingLink: '',
      color: '',
    },
  });

  const handleFormSubmit = (data: AddEventFormValues) => {
    if (!startDate || !endDate) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const fullStart = new Date(startDate);
    const fullEnd = new Date(endDate);

    if (!allDay) {
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

    const payload: AddEventFormValues = {
      ...data,
      start: fullStart.toISOString(),
      end: fullEnd.toISOString(),
      meetingLink: data.meetingLink,
      color: selectedColor,
      allDay,
      recurring,
      description: editorContent,
    };
    console.log('events', payload);
    onSubmit(payload);
  };

  const handleCancel = () => {
    form.reset();
    setStartDate(start);
    setEndDate(end);
    setStartTime('');
    setEndTime('');
    setAllDay(false);
    setRecurring(false);
    setSelectedColor(null);
    setEditorContent('');
    onCancel();
  };

  return (
    <DialogContent className="w-full sm:max-w-[720px] max-h-[96vh] overflow-y-auto">
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
                        <Label htmlFor="member1" className="text-sm font-normal text-high-emphasis">
                          Aaron Green
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]" />
                        <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                          <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Label htmlFor="member1" className="text-sm font-normal text-high-emphasis">
                          Aaron Green
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]" />
                        <Avatar className="ring-2 ring-neutral-50 w-6 h-6 shadow-md">
                          <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Label htmlFor="member1" className="text-sm font-normal text-high-emphasis">
                          Aaron Green
                        </Label>
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
            <div className="flex flex-col w-[40%] gap-4">
              <div className="flex items-center gap-4">
                <Switch checked={allDay} onCheckedChange={setAllDay} />
                <Label>All day</Label>
              </div>
              <div className="flex items-center gap-4">
                <Switch checked={recurring} onCheckedChange={setRecurring} />
                <Label>Recurring Event</Label>
              </div>
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
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-high-emphasis">Colors</p>
            <ColorPickerTool
              selectedColor={selectedColor}
              onColorChange={(color) => setSelectedColor(color)}
            />
          </div>
          <div className="flex w-full gap-4 !mt-6">
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
