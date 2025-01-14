import { useEffect } from 'react';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { ClientMiddleware } from './state/client-middleware';

import { AuthLayout } from './pages/auth/AuthLayout';
import { SigninPage } from 'pages/auth/signin/SigninPage';
import { SignupPage } from 'pages/auth/signup/SignupPage';

const queryClient = new QueryClient();

function RedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/activate-success') {
      const headers = new Headers();
      headers.set('x-current-path', location.pathname);

      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <RedirectHandler />
      <ClientMiddleware>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/signin" replace />}/> */}
        </Routes>
      </ClientMiddleware>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
