"use client";
import { AccountActivationForm } from "@/features/auth/components/account-activation-form";
import { useAuthState } from "@/state/client-middleware";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function AccountActivationPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { isMounted, hasToken } = useAuthState();
  const code = searchParams.code || "";

  useLayoutEffect(() => {
    if (hasToken) redirect("/");
  }, [hasToken]);

  if (!isMounted) return null;

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
