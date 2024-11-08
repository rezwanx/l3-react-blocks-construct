import { z } from "zod";

export const addUserFormValidationSchema = z.object({
  FirstName: z.string().min(1, "First name can't be empty"),
  LastName: z.string().min(1, "First name can't be empty"),
  Email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number can't be empty"),
});

export type AddUserFormType = z.infer<typeof addUserFormValidationSchema>;

export const addUserFormDefaultValue: AddUserFormType = {
  FirstName: "",
  LastName: "",
  Email: "",
  phoneNumber: "",
};
