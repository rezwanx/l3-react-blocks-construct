"use client";
// import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const publicRoutes = [
  "/signin",
  "/signup",
  "/forgetpassword",
  "/resetpassword",
  "/activate",
  "/activate-success",
];

export const ClientMiddlware = ({ children }: { children: ReactNode }) => {
  // const router = useRouter();

  // if (!localStorage.getItem("access_token")) {
  //   router.replace("/signin");
  // }
  return <>{children}</>;
};
