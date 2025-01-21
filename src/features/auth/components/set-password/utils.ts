import { z } from 'zod';

export const setPasswordFormValidationSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .regex(/(?=.*\d)/, 'Password must contain at least one number')
      .regex(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type setPasswordFormType = z.infer<typeof setPasswordFormValidationSchema>;

export const setPasswordFormDefaultValue: setPasswordFormType = {
  password: '',
  confirmPassword: '',
};
