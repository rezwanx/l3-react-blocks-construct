import {
  createPasswordValidationSchema,
  PasswordFormType,
  passwordFormDefaultValues,
} from '../../../../utils/validation/password-validation';

export const resetPasswordFormValidationSchema = createPasswordValidationSchema();
export type resetPasswordFormType = PasswordFormType;
export const resetPasswordFormDefaultValue = passwordFormDefaultValues;
