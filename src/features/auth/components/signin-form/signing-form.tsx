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
  signinFormDefaultValue,
  signinFormType,
  signinFormValidationSchema,
} from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { UPasswordInput } from "@/components/core/u-password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UCheckbox } from "@/components/core/uCheckbox";
import { useSigninMutation } from "../../hooks/useAuth";

export const SigninForm = () => {
  const form = useForm<signinFormType>({
    defaultValues: signinFormDefaultValue,
    resolver: zodResolver(signinFormValidationSchema),
  });

  const { isPending, mutate } = useSigninMutation();

  const onSubmitHandler = async (values: signinFormType) => {
    const res = await mutate(values);
    console.log(res);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex justify-between items-center">
          <UCheckbox
            label="Remember me"
            labelClassName=" text-gray-400 hover:text-primary"
          />
          <Link
            href="/forgetpassword"
            className="text-gray-400 text-sm font-medium hover:text-primary"
          >
            Froget password?
          </Link>
        </div>
        <div className="flex gap-10">
          <Button
            className="flex-1 font-extrabold"
            size="lg"
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            Login
          </Button>
          <Button
            className="flex-1 font-extrabold border-primary text-primary"
            variant="outline"
            size="lg"
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
