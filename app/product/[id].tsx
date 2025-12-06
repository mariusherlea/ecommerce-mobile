//app/product/[id].tsx

import RichText from "@/components/RichText";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { getProduct } from "../../src/api/products";
import { useCartStore } from "../../src/store/cartStore";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();

  console.log("DOCUMENT ID PRIMIT:", id);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
  });

  const addToCart = useCartStore((s) => s.addToCart);

  if (isLoading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  const product = data?.data?.[0];

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const image =
    product?.images?.data?.[0]?.url ||
    "https://via.placeholder.com/400";

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: 280, borderRadius: 8 }}
      />

      <Text style={{ fontSize: 26, fontWeight: "600", marginTop: 20 }}>
        {product.title}
      </Text>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        {product.price} €
      </Text>

      <RichText content={product.description}/>

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
