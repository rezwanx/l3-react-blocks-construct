"use client";
import Image from "next/image";
import { ReactNode, useLayoutEffect } from "react";
import bgAuth from "@/assets/bg-auth.png";
import { useAuthState } from "@/state/client-middleware";
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isMounted, isAuthenticated } = useAuthState();
  useLayoutEffect(() => {
    if (isAuthenticated) redirect("/");
  }, [isAuthenticated]);

  if (!isMounted) return null;
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
      <div className="hidden md:block flex-1 relative">
        <Image src={bgAuth} alt="bg-auth" fill={true} />
        <div className=" absolute left-0 right-0 top-0 bottom-0 bg-primary opacity-70"></div>
      </div>
    </div>
  );
}
