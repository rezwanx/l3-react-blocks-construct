import { z } from 'zod';

export const resetPasswordFormValidationSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 character long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 character long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be matched',
    path: ['confirmPassword'],
  });

export type resetPasswordFormType = z.infer<typeof resetPasswordFormValidationSchema>;

export const resetPasswordFormDefaultValue: resetPasswordFormType = {
  password: '',
  confirmPassword: '',
};
