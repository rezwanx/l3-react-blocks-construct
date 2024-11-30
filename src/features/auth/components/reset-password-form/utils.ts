import { z } from "zod";

export const resetPasswordFormValidationSchema = z.object({
  password: z.string().min(8, "password must be at least 8 character long"),
  confirmPassword: z
    .string()
    .min(8, "password must be at least 8 character long"),
});

export type resetPasswordFormType = z.infer<
  typeof resetPasswordFormValidationSchema
>;

export const resetPasswordFormDefaultValue: resetPasswordFormType = {
  confirmPassword: "",
  password: "",
};
