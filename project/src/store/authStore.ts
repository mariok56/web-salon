// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  userData: any | null;
  login: (userData?: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userData: null,
      login: (userData = {}) => set({ isAuthenticated: true, userData }),
      logout: () => set({ isAuthenticated: false, userData: null }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, userData: state.userData }),
    }
  )
);