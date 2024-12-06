"use client";

import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";

export const publicRoutes = ["/signin", "/activate", "/activate-success"];

export const useAuthState = () => {
  const [isAuth, setIsAuth] = useState({
    isMounted: false,
    hasToken: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsAuth({
        isMounted: true,
        hasToken: !!localStorage.getItem("access_token"),
      });
    }, 0);
  }, []);

  return { ...isAuth };
};

export const ClientMiddleware = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const { isMounted, hasToken } = useAuthState();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useLayoutEffect(() => {
    if (isMounted && !hasToken && !isPublicRoute) redirect("/signin");
  }, [hasToken, isMounted, isPublicRoute]);

  if (!isMounted) return null;
  if (isPublicRoute) return children;
  return children;
};
