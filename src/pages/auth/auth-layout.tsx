import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../state/client-middleware';
import bgAuthLight from '../../assets/images/bg_auth_light.svg';
import bgAuthDark from '../../assets/images/bg_auth_dark.svg';

export function AuthLayout() {
  const navigate = useNavigate();
  const { isMounted, isAuthenticated } = useAuthState();

  const theme = localStorage.getItem('theme') || 'light';

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-[32rem] relative bg-primary-shade-50">
        <img
          src={theme === 'light' ? bgAuthLight : bgAuthDark}
          alt="bg-auth"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
