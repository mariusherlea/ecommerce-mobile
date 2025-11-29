import { getToken } from "../utils/secureStore";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = async (path: string, options: RequestInit = {}) => {
  const token = await getToken();

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  }).then((res) => res.json());
};
