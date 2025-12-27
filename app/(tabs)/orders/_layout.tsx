//app/(tabs)/orders/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../../src/context/AuthContext";

export default function OrdersProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
