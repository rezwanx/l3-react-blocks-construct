import { z } from 'zod';

export const signinFormValidationSchema = z.object({
  username: z.string().min(1, "User name can't be empty"),
  password: z.string().min(8, 'Password must be at least 8 character long'),
});

export type signinFormType = z.infer<typeof signinFormValidationSchema>;

export const signinFormDefaultValue: signinFormType = {
  username: '',
  password: '',
};
