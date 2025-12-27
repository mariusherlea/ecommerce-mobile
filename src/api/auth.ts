//src/api/auth.ts
import { api } from "./client";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
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

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // { jwt, user }
}




export const register = (email: string, password: string, username: string) =>
  api(`/auth/local/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });
