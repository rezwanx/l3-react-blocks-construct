import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  meetingLink: z.string().min(1, 'Zoom meeting link required'),
  start: z.string(),
  end: z.string(),
  color: z.string().nullable(),
  allDay: z.boolean().optional(),
  recurring: z.boolean().optional(),
});

export type AddEventFormValues = z.infer<typeof formSchema>;
