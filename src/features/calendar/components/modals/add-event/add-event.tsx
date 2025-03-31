import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';

type AddEventProps = {
  start: Date;
  end: Date;
  onSubmit: (data: AddEventFormValues) => void;
  onCancel: () => void;
};

export function AddEvent({ start, end, onSubmit, onCancel }: AddEventProps) {
  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
    },
  });

  return (
    <DialogContent>
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
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
