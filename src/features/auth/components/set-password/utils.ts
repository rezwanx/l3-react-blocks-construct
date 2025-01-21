import { z } from 'zod';

const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasNumber = /[0-9]/;
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

export const setPasswordFormValidationSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        (password) => hasLowercase.test(password),
        'Password must contain at least one lowercase letter'
      )
      .refine(
        (password) => hasUppercase.test(password),
        'Password must contain at least one uppercase letter'
      )
      .refine((password) => hasNumber.test(password), 'Password must contain at least one number')
      .refine(
        (password) => hasSpecialChar.test(password),
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
