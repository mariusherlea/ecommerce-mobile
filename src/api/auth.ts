import { api } from "./client";

export const login = (identifier: string, password: string) =>
  api(`/auth/local`, {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });

export const register = (email: string, password: string, username: string) =>
  api(`/auth/local/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });
