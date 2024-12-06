"use client";
import Image from "next/image";
import thumbnailPic from "@/assets/bg-auth.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileFormDefaultvalue,
  ProfileFormType,
  profileFormValidationSchema,
} from "./utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetAccount, useUpdateAccount } from "../../hooks/useAccount";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const ProfileForm = () => {
  const { data } = useGetAccount();
  const { mutateAsync } = useUpdateAccount();

  const form = useForm<ProfileFormType>({
    defaultValues: profileFormDefaultvalue,
    resolver: zodResolver(profileFormValidationSchema, {}, { raw: true }),
  });

  const resetForm = (data: ProfileFormType) => {
    const { firstName, lastName, email, itemId } = data;
    form.reset({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      itemId: itemId || "",
    });
  };

  useEffect(() => {
    if (data) {
      resetForm(data as ProfileFormType);
    }
  }, [data]);

  const submitHandler = async (values: ProfileFormType) => {
    try {
      await mutateAsync(values);
      resetForm(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div>
        <div className="relative bg-rose-50 w-[200px] h-[200px] rounded-full  ring-4 ring-offset-8">
          <Image
            src={thumbnailPic}
            alt="profile pic"
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="mt-8 flex-1 max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="enter your email"
                    value={form.getValues("email")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => resetForm(data as ProfileFormType)}
                disabled={!form.formState.isDirty}
              >
                reset
              </Button>
              <Button type="submit" disabled={!form.formState.isDirty}>
                save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
