import { create } from 'zustand';
import type { User } from '../types/auth';
import axios from 'axios';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: User | null;
  setTokens: (token: string, refreshToken: string) => void;
  setUserData: (user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

const REFRESH_TOKEN_KEY = 'io_gama_refresh_token';

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  isAuthenticated: false,
  isInitializing: true,
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

  initialize: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      set({ isInitializing: false });
      return;
    }

    try {
      // Intento de refresh silencioso al cargar la app
      const response = await axios.post(
        `${import.meta.env.VITE_API_GATEWAY_URL}/api/users/Auth/refresh-token`,
        { refreshToken }
      );

      const { token, refreshToken: newRefreshToken, userId, userContext } = response.data;

      get().setTokens(token, newRefreshToken);
      get().setUserData({
        id: userId,
        email: userContext.email || '', // El backend debería devolver el email o lo recuperamos del token
        role: userContext.userType,
        type: userContext.userType,
        profileName: userContext.profile.name,
        fotoUrl: userContext.profile.fotoUrl,
      });
    } catch (error) {
      console.error('Error al restaurar sesión:', error);
      get().logout();
    } finally {
      set({ isInitializing: false });
    }
  },
}));
