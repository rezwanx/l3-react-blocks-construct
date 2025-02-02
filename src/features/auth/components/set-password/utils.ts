import {
  createPasswordValidationSchema,
  PasswordFormType,
  passwordFormDefaultValues,
} from '../../../../utils/validation/password-validation';

export const setPasswordFormValidationSchema = createPasswordValidationSchema();
export type setPasswordFormType = PasswordFormType;
export const setPasswordFormDefaultValue = passwordFormDefaultValues;
