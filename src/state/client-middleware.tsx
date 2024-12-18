"use client";

import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useAuthStore } from "./store/auth";

export const publicRoutes = ["/signin", "/activate", "/activate-success", "/reset-password"];

export const useAuthState = () => {
  const { isAuthenticated } = useAuthStore();
  const [isAuth, setIsAuth] = useState({
    isMounted: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    setIsAuth({
      isMounted: true,
      isAuthenticated: isAuthenticated,
    });
  }, [isAuthenticated]);

  return { ...isAuth };
};

export const ClientMiddleware = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const { isMounted, isAuthenticated } = useAuthState();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useLayoutEffect(() => {
    if (isMounted && !isAuthenticated && !isPublicRoute) redirect("/signin");
  }, [isAuthenticated, isMounted, isPublicRoute]);

  if (!isMounted) return null;
  if (isPublicRoute) return children;
  return children;
};
