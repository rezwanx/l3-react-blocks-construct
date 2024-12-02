import { AccountActivationForm } from "@/features/auth/components/account-activation-form";

export default function AccountActivationPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code || "";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px]  p-10 shadow">
        <div className="text-primary">
          <h2 className="text-3xl">Welcome!</h2>
          <h1 className="text-4xl font-bold">Activate Your Account</h1>
          <p className="text-black dark:text-white">
            Set up your password to get started.
          </p>
        </div>
        <div className="mt-8">
          <AccountActivationForm code={code} />
        </div>
      </div>
    </div>
  );
}
