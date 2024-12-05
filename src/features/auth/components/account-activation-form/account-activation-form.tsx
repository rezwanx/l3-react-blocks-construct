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
  accountActivationFormDefaultValue,
  accountActivationFormType,
  accountActivationFormValidationSchema,
} from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UPasswordInput } from "@/components/core/u-password-input";
import { Button } from "@/components/ui/button";
import { useAccountActivation } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export const AccountActivationForm = ({ code }: { code: string }) => {
  const router = useRouter();
  const form = useForm<accountActivationFormType>({
    defaultValues: accountActivationFormDefaultValue,
    resolver: zodResolver(accountActivationFormValidationSchema),
  });

  const { mutateAsync } = useAccountActivation();

  const onSubmitHandler = async (values: accountActivationFormType) => {
    try {
      await mutateAsync({ password: values.password, code });
      router.replace("/activate-success");
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
        <div className="flex gap-10 mt-6">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            // loading={isPending}
            // disabled={isPending}
          >
            Activate Account
          </Button>
        </div>
      </form>
    </Form>
  );
};
