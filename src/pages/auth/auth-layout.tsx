import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../state/client-middleware';
import bgAuth from '../../assets/bg_auth.png';

export function AuthLayout() {
  const navigate = useNavigate();
  const { isMounted, isAuthenticated } = useAuthState();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-[32rem] relative bg-red-400">
        <img src={bgAuth} alt="bg-auth" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 opacity-70" />
      </div>
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
