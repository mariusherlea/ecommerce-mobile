// app/(tabs)/orders/index.tsx

import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";
import { AuthContext } from "../../../src/context/AuthContext";
import LoginScreen from "../login";

const API_URL = "http://192.168.2.33:1337";

function normalizeOrder(order: any) {
  const data = order.attributes ?? order;

  return {
    id: order.id,
    total: data.total,
    status: data.status,
    createdAt: data.createdAt,
  };
}

export default function OrdersScreen() {
  const { user, token, signOut } = useContext(AuthContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 DACA NU E LOGAT → ARATĂ LOGIN (CU TAB-URI)
  if (!user) {
    return <LoginScreen />;
  }

  useEffect(() => {
    if (!token) return;

    async function fetchOrders() {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setOrders(json.data ?? []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
        My Orders
      </Text>

      <Pressable
        onPress={signOut}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: "#eee",
          borderRadius: 6,
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          Logout
        </Text>
      </Pressable>

      <Text style={{ fontSize: 16, marginBottom: 10, opacity: 0.7 }}>
        Orders for {user?.username ?? user?.email}
      </Text>

      {orders.length === 0 ? (
        <Text style={{ marginTop: 20 }}>
          You have no orders yet.
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const order = normalizeOrder(item);

            return (
              <View
                style={{
                  marginTop: 15,
                  padding: 15,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <Text>Order #{order.id}</Text>
                <Text>Status: {order.status ?? "—"}</Text>
                <Text>
                  Total: {order.total ? `${order.total} €` : "—"}
                </Text>
                <Text>
                  Date:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

