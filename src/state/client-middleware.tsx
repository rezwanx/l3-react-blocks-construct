import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { publicRoutes } from 'constant/auth-public-routes';

interface AuthState {
  isMounted: boolean;
  isAuthenticated: boolean;
  isMfaEnabled: boolean;
}

export const useAuthState = () => {
  const { isAuthenticated, isMfaEnabled } = useAuthStore();
  const [isAuth, setIsAuth] = useState<AuthState>({
    isMounted: false,
    isAuthenticated: false,
    isMfaEnabled: false,
  });

  useEffect(() => {
    setIsAuth({
      isMounted: true,
      isAuthenticated: isAuthenticated,
      isMfaEnabled: isMfaEnabled,
    });
  }, [isAuthenticated, isMfaEnabled]);

  return isAuth;
};

interface ClientMiddlewareProps {
  children: ReactNode;
}

export const ClientMiddleware: React.FC<ClientMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { isMounted, isAuthenticated, isMfaEnabled } = useAuthState();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useLayoutEffect(() => {
    if (isMounted && !isAuthenticated && !isPublicRoute && !isMfaEnabled) {
      navigate('/login');
    }
  }, [isAuthenticated, isMounted, isMfaEnabled, isPublicRoute, navigate]);

  if ((!isMounted || !isAuthenticated) && !isPublicRoute) return null;

  return <>{children}</>;
};
