import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  start: z.string(),
  end: z.string(),
});

export type AddEventFormValues = z.infer<typeof formSchema>;
