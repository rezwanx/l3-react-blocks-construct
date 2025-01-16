/* eslint-disable react/no-children-prop */
import { useEffect } from 'react';

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { ClientMiddleware } from './state/client-middleware';

import { AuthLayout } from './pages/auth/AuthLayout';
import MainLayout from 'pages/main/MainLayout';

import { SigninPage } from 'pages/auth/signin/SigninPage';
import { SignupPage } from 'pages/auth/signup/SignupPage';
import { EmailVerification } from 'pages/auth/emailVerification/emailVerification';
import Dashboard from 'pages/main/dashboard';
import { ProfileForm } from 'features/settings/profile/components/profile-form';

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
            <Route path="/sent-email" element={<EmailVerification />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileForm />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* <Route path="*" element={<Navigate to="/signin" replace />}/> */}
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
