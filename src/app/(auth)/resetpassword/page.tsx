import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-primary">
        <h2 className=" text-5xl">Reset,</h2>
        <h1 className="text-7xl font-bold">Password!</h1>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
