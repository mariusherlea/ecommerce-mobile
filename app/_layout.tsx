import { StripeProvider } from "@stripe/stripe-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK!}>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }}>
          
          {/* ---------- GLOBAL HEADER ---------- */}
          <View
            style={{
              height: 60,
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              zIndex: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>MyShop</Text>
          </View>

          {/* ---------- ALL PAGES BELOW HEADER ---------- */}
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>

        </View>
      </QueryClientProvider>
    </StripeProvider>
  );
}
