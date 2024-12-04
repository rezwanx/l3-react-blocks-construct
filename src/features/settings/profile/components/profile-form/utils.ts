import { z } from "zod";

export const profileFormValidationSchema = z.object({
  firstName: z.string().min(1, "First name can't be empty"),
  lastName: z.string().min(1, "First name can't be empty"),
  email: z.string().email(),
});

export type ProfileFormType = typeof profileFormDefaultvalue;

export const profileFormDefaultvalue = {
  itemId: "",
  firstName: "",
  lastName: "",
  email: "",
};
