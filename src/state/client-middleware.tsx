"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const publicRoutes = ["/signin", "/activate", "/activate-success"];

const useAuthState = () => {
  const [isMounted, setMounted] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasToken(!!localStorage.getItem("access_token"));
  }, []);

  return { isMounted, hasToken };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const { isMounted, hasToken } = useAuthState();

  useEffect(() => {
    if (isMounted && !hasToken && currentPath !== "/signin") {
      router.push("/signin");
    }
  }, [isMounted, hasToken, currentPath, router]);

  if (!isMounted) {
    return null;
  }

  if (!hasToken && currentPath !== "/signin") {
    return null;
  }
  return <>{children}</>;
};

export const ClientMiddleware = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const isPublicRoute = publicRoutes.includes(currentPath);

  if (isPublicRoute) return <>{children}</>;

  return <AuthProvider>{children}</AuthProvider>;
};
