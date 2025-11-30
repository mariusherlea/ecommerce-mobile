import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCartStore } from "../../src/store/cartStore";

export default function CartScreen() {
  const { items, increaseQty, decreaseQty, removeFromCart } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      {items.map((item) => (
        <View
          key={item.id}
          style={{
            marginBottom: 20,
            padding: 10,
            backgroundColor: "#f2f2f2",
            borderRadius: 8,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 150, borderRadius: 8 }}
          />

          <Text style={{ fontSize: 20, marginTop: 10 }}>{item.title}</Text>
          <Text style={{ fontSize: 18 }}>{item.price} €</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => decreaseQty(item.id)}>
              <Text style={{ fontSize: 20 }}>−</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20 }}>{item.qty}</Text>

            <TouchableOpacity onPress={() => increaseQty(item.id)}>
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={{ fontSize: 24, marginTop: 20 }}>
        Total: {total} €
      </Text>
    </ScrollView>
  );
}
