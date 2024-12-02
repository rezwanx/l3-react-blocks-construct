import { z } from "zod";

export const accountActivationFormValidationSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be matched",
    path: ["confirmPassword"],
  });

export type accountActivationFormType = z.infer<
  typeof accountActivationFormValidationSchema
>;

export const accountActivationFormDefaultValue: accountActivationFormType = {
  password: "",
  confirmPassword: "",
};
