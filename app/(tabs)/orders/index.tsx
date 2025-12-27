// app/(tabs)/orders/index.tsx
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../../src/context/AuthContext";

type Order = {
  id: number;
  attributes: {
    total: number;
    status: string;
    createdAt: string;
  };
};

const API_URL = "http://192.168.2.33:1337"; // IP-ul tău

export default function OrdersScreen() {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) return;

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
  }, [user, token]);

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

      {orders.length === 0 ? (
        <Text style={{ marginTop: 20 }}>
          You have no orders yet.
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => {
  const { status, total, createdAt } = item.attributes ?? {};

  return (
    <View
      style={{
        marginTop: 15,
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Text>Order #{item.id}</Text>
      <Text>Status: {String(status ?? "")}</Text>
      <Text>Total: {total ? `${total} €` : "—"}</Text>
      <Text>
        Date:{" "}
        {createdAt
          ? new Date(createdAt).toLocaleDateString()
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

