import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './index.type';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      login: (accessToken, refreshToken) =>
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
        }),
      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
