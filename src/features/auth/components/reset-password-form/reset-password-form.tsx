"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  resetPasswordFormDefaultValue,
  resetPasswordFormType,
  resetPasswordFormValidationSchema,
} from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UPasswordInput } from "@/components/core/u-password-input";
import { Button } from "@/components/ui/button";

export const ResetPasswordForm = () => {
  const form = useForm<resetPasswordFormType>({
    defaultValues: resetPasswordFormDefaultValue,
    resolver: zodResolver(resetPasswordFormValidationSchema),
  });

  const onSubmitHandler = async (values: resetPasswordFormType) => {
    console.log(values);
    try {
    } catch (_error) {}
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <UPasswordInput {...field} error="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <UPasswordInput {...field} error="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-10">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            // loading={isPending}
            // disabled={isPending}
          >
            submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
