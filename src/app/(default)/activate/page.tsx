"use client";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { AccountActivationForm } from "@/features/auth/components/account-activation-form";
import { useAuthState } from "@/state/client-middleware";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountActivationPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { isMounted, isAuthenticated } = useAuthState();
  const code = searchParams.code || "";

  useLayoutEffect(() => {
    if (isAuthenticated) redirect("/");
  }, [isAuthenticated]);

  if (!isMounted) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto w-[500px] rounded shadow p-10 sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl leading-9 text-primary">Welcome!</CardTitle>
          <CardDescription className="text-xl text-primary">
              Activate Your Account
          </CardDescription>
          <p className="text-black dark:text-white">
            Set up your password to get started.
          </p>
        </CardHeader>
        <CardContent className="items-start justify-start">
          <AccountActivationForm code={code} />
        </CardContent>
      </Card>
    </div>
  );
}
