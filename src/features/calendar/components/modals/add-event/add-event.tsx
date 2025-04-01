import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'components/ui/form';
import { Input } from 'components/ui/input';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';

type AddEventProps = {
  start: Date;
  end: Date;
  onSubmit: (data: AddEventFormValues) => void;
  onCancel: () => void;
};

export function AddEvent({ start, end, onSubmit, onCancel }: AddEventProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('13:00');
  const [endTime, setEndTime] = useState('14:00');
  const [allDay, setAllDay] = useState(false);
  const [recurring, setRecurring] = useState(false);

  const timeOptions = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
    },
  });

  return (
    <DialogContent className="w-full sm:max-w-[720px]">
      <DialogHeader>
        <DialogTitle>Add Event</DialogTitle>
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
          <div className="flex flex-col gap-3">
            <p className="text-base text-high-emphasis font-semibold">Participants</p>
            <div className="flex items-center gap-2">
              <Avatar className="ring-2 ring-neutral-50 shadow-md">
                <AvatarImage alt="participants" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="border-dashed">
                <Plus className="w-5 h-5 text-high-emphasis" />
              </Button>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex gap-4 w-[60%]">
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
                      {timeOptions.map((time) => (
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
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator orientation="vertical" />
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
          <DialogFooter className="flex w-full !items-center !justify-between gap-4 !mt-6">
            <Button variant="outline" size="icon">
              <Trash className="!w-5 !h-4 text-destructive" />
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
