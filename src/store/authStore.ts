import { create } from "zustand";
import { clearToken, saveToken } from "../utils/secureStore";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: any, jwt: string) => {
    saveToken(jwt);
    set({ user });
  },
  logout: () => {
    clearToken();
    set({ user: null });
  },
}));
