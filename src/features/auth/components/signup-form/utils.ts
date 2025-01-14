import { z } from 'zod';

export const signupFormValidationSchema = z.object({
  username: z.string().min(1, "user name can't be empty"),
});

export type signupFormType = z.infer<typeof signupFormValidationSchema>;

export const signupFormDefaultValue: signupFormType = {
  username: '',
};
