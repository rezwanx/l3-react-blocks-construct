"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const ClientMiddlware = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  if (!localStorage.getItem("access_token")) {
    router.replace("/signin");
  }
  return <>{children}</>;
};
