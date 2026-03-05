import { create } from 'zustand';
import type { User } from '../types/auth';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  setTokens: (token: string, refreshToken: string) => void;
  setUserData: (user: User) => void;
  logout: () => void;
}

const REFRESH_TOKEN_KEY = 'io_gama_refresh_token';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  isAuthenticated: false,
  user: null,

  setTokens: (token, refreshToken) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    set({
      token,
      refreshToken,
      isAuthenticated: true,
    });
  },

  setUserData: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));
