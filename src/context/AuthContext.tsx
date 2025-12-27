import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { login as strapiLogin } from '../api/auth';


type AuthContextType = {
  user: any;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

async function signIn(email: string, password: string) {
  const res = await strapiLogin(email, password);

  if (!res?.jwt) {
    throw new Error("Invalid credentials");
  }

  await AsyncStorage.setItem("token", res.jwt);
  await AsyncStorage.setItem("user", JSON.stringify(res.user));

  setUser(res.user);
  setToken(res.jwt);
}

async function signOut() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");

  setUser(null);
  setToken(null);
}


  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

