import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  start: z.string(),
  end: z.string(),
  meetingLink: z.string().min(1, 'Meeting link required'),
  description: z.string(),
  color: z.string().nullable(),
  allDay: z.boolean().optional(),
  recurring: z.boolean().optional(),
});

export type AddEventFormValues = z.infer<typeof formSchema>;
