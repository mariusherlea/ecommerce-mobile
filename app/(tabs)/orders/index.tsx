import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../../src/context/AuthContext";

export default function OrdersScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
        Orders Page (TEST)
      </Text>

      <Text style={{ fontSize: 16, marginTop: 10 }}>
        User logged in: {user?.username ?? "No user"}
      </Text>
    </View>
  );
}
