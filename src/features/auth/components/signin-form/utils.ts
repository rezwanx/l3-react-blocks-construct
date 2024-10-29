import { z } from "zod";

export const signinFormValidationSchema = z.object({
  email: z.string().min(1, "email can't be empty").email("enter a valid email"),
  password: z.string().min(8, "password must be at least 8 character long"),
});

export type signinFormType = z.infer<typeof signinFormValidationSchema>;

export const signinFormDefaultValue: signinFormType = {
  email: "",
  password: "",
};
