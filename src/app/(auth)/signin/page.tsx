import { UCheckbox } from "@/components/core/uCheckbox/uCheckbox";
import { UInput } from "@/components/core/uInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-primary">
        <h2 className=" text-5xl">Hello,</h2>
        <h1 className="text-7xl font-bold">Welcome!</h1>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <UInput label="Email" placeholder="enter your email" />
        <UInput label="Password" placeholder="enter your password" />
        <div className="flex justify-between items-center">
          <UCheckbox
            label="Remember me"
            labelClassName=" text-gray-400 hover:text-primary"
          />
          <Link
            href="/forgetPassword"
            className="text-gray-400 text-sm font-medium hover:text-primary"
          >
            Froget password?
          </Link>
        </div>
        <div className="flex gap-10">
          <Button className="flex-1 font-extrabold" size="lg">
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
    </div>
  );
}
