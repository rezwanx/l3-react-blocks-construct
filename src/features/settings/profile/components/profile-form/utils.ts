import { z } from "zod";

export const profileFormValidationSchema = z.object({
  firstName: z.string().min(1, "First name can't be empty"),
  lastName: z.string().min(1, "First name can't be empty"),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number can't be empty"),
});

export type ProfileFormType = z.infer<typeof profileFormValidationSchema>;

export const profileFormDefaultvalue = {
  language: "",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  active: true,
};
