//src/api/auth.ts
import { api } from "./client";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  if (!API_URL) {
    throw new Error("API_URL is undefined");
  }

  const res = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  const data = await res.json();
console.log("API_URL:", process);
  if (!res.ok || !data?.jwt) {
    console.log("LOGIN ERROR RESPONSE:", data);
    throw new Error(data?.error?.message ?? "Login failed");
  }

  return data; // { jwt, user }
}




export const register = (email: string, password: string, username: string) =>
  api(`/auth/local/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });
