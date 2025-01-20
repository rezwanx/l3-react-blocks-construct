import { z } from 'zod';

export const setPasswordFormValidationSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 character long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 character long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be matched',
    path: ['confirmPassword'],
  });

export type setPasswordFormType = z.infer<typeof setPasswordFormValidationSchema>;

export const setPasswordFormDefaultValue: setPasswordFormType = {
  password: '',
  confirmPassword: '',
};
