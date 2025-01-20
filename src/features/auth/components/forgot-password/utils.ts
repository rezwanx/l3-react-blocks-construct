import { z } from 'zod';

export const forgotPasswordFormValidationSchema = z.object({
  email: z.string().min(1, "email name can't be empty"),
});

export type forgotPasswordFormType = z.infer<typeof forgotPasswordFormValidationSchema>;

export const forgotPasswordFormDefaultValue: forgotPasswordFormType = {
  email: '',
};
