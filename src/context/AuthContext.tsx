import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { login as strapiLogin } from "../api/auth";

type AuthContextType = {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load user when app starts
  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  // LOGIN
  async function signIn(email: string, password: string) {
    const res = await strapiLogin(email, password);

    if (res.jwt) {
      await AsyncStorage.setItem("token", res.jwt);
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      router.replace("/(tabs)"); // 🔥 merge direct în app
    }
  }

  // LOGOUT
  async function signOut() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);

    router.replace("/login"); // 🔥 trimite înapoi la login
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
