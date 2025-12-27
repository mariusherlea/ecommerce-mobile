// app/(tabs)/orders/index.tsx
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { AuthContext } from "../../../src/context/AuthContext";

type Order = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
};

const API_URL = "http://192.168.2.33:1337"; // IP-ul tău

export default function OrdersScreen() {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ TEST OBLIGATORIU (users/me)
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ users/me OK:", data);
      })
      .catch((err) => {
        console.error("❌ users/me ERROR:", err);
      });
  }, [token]);

  // ✅ FETCH ORDERS
  useEffect(() => {
    if (!user || !token) return;

    async function fetchOrders() {
      try {
        const res = await fetch(
          `${API_URL}/api/orders?filters[user][id][$eq]=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        setOrders(json.data ?? []);
      } catch (error) {
        console.error("❌ Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user, token]);

  // ⛔ render logic DOAR după hooks
  if (!user) {
    return <Text>You must be logged in</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
        My Orders
      </Text>

      {orders.length === 0 ? (
        <Text style={{ marginTop: 20 }}>
          You have no orders yet.
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 15,
                padding: 15,
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              <Text>Order ID: {item.id}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Total: ${item.total}</Text>
              <Text>
                Date: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
