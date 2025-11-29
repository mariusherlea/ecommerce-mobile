//app/product/[id].tsx
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { getProduct } from "../../src/api/products";
import { useCartStore } from "../../src/store/cartStore";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
  });

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!data?.data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const product = data.data;

  const image =
    product?.images?.data?.[0]?.url ||
    "https://via.placeholder.com/400";

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 280,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <Text style={{ fontSize: 26, fontWeight: "600" }}>
        {product.title}
      </Text>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        {product.price} €
      </Text>

      <Text style={{ marginBottom: 20 }}>
        {product.description}
      </Text>

      <Button
        title="Add to Cart"
        onPress={() =>
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image,
            qty: 1,
          })
        }
      />
    </ScrollView>
  );
}
