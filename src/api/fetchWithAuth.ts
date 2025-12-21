import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./client";

export async function apiAuth(path: string, options: RequestInit = {}) {
  const token = await AsyncStorage.getItem("token");

  return api(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });
}
