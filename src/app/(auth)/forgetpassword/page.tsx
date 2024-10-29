import { UInput } from "@/components/core/u-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-primary">
        <h2 className=" text-5xl">Don't,</h2>
        <h1 className="text-7xl font-bold">Worry 🙂</h1>
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <div>
          <h2>we’ll send you an email with a link to reset your password</h2>
        </div>
        <UInput label="Email" placeholder="enter your email" error="" />

        <div className="flex gap-10">
          <Button className="flex-1 font-extrabold" size="lg">
            Send
          </Button>
          <Link href="/signin" className="flex-1">
            <Button
              className="w-full font-extrabold border-primary text-primary"
              variant="outline"
              size="lg"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
