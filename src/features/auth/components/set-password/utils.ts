import { z } from 'zod';

export const setPasswordFormValidationSchema = z.object({
  password: z.string().min(8, 'password must be at least 8 character long'),
  confirmPassword: z.string().min(8, 'password must be at least 8 character long'),
});

export type setPasswordFormType = z.infer<typeof setPasswordFormValidationSchema>;

export const setPasswordFormDefaultValue: setPasswordFormType = {
  password: '',
  confirmPassword: '',
};
