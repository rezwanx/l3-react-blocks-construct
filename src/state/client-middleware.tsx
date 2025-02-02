import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useAuthStore } from './store/auth';

export const publicRoutes = [
  '/login',
  '/signup',
  '/sent-email',
  '/activate',
  '/resetpassword',
  '/success',
  '/activate-failed',
  '/forgot-password',
];

interface AuthState {
  isMounted: boolean;
  isAuthenticated: boolean;
}

export const useAuthState = () => {
  const { isAuthenticated } = useAuthStore();
  const [isAuth, setIsAuth] = useState<AuthState>({
    isMounted: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    setIsAuth({
      isMounted: true,
      isAuthenticated: isAuthenticated,
    });
  }, [isAuthenticated]);

  return isAuth;
};

interface ClientMiddlewareProps {
  children: ReactNode;
}

export const ClientMiddleware: React.FC<ClientMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { isMounted, isAuthenticated } = useAuthState();
  const isPublicRoute = publicRoutes.includes(currentPath);

  useLayoutEffect(() => {
    if (isMounted && !isAuthenticated && !isPublicRoute) {
      navigate('/login');
    }
  }, [isAuthenticated, isMounted, isPublicRoute, navigate]);

  if ((!isMounted || !isAuthenticated) && !isPublicRoute) return null;

  return <>{children}</>;
};
