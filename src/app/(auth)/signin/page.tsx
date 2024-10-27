"use client";
import { UInput } from "@/components/core/u-input";
import { UPasswordInput } from "@/components/core/u-password-input";
import { UCheckbox } from "@/components/core/uCheckbox/uCheckbox";
import { Button } from "@/components/ui/button";
// import { useAuth } from "@/features/auth/hooks/useAuth";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
export default function SigninPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        email: z.string().email("enter a valid email"),
        password: z.string(),
      })
    ),
  });

  const onSubmitHandler = (values) => {
    console.log(values);
  };
  console.log(errors);
  return (
    <div className="flex flex-col gap-6">
      <div className="text-primary">
        <h2 className=" text-5xl">Hello,</h2>
        <h1 className="text-7xl font-bold">Welcome!</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mt-6 flex flex-col gap-6">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <UInput
                label="Email"
                placeholder="enter your email"
                error={errors["email"]?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <UPasswordInput
                label="Password"
                placeholder="enter your password"
                error={errors["password"]?.message}
                {...field}
              />
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
            <Button className="flex-1 font-extrabold" size="lg" type="submit">
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
        </div>
      </form>

      <div>
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1">
            <hr className="h-[2px] bg-gray-200 border-0 rounded " />
          </div>
          <div className=" text-primary">Or login with</div>
          <div className="flex-1">
            <hr className="h-[2px] bg-gray-200 border-0 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Button
            className="flex-1 border-red-500 text-red-500 font-semibold"
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              fill="red"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Google
          </Button>
          <Button
            className="flex-1 border-blue-600 text-blue-600"
            variant="outline"
          >
            <Facebook className="" />
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
