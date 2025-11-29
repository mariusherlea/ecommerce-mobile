//app/(tabs)/index.tsx

import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getProducts } from "../../src/api/products";

export default function HomeScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (!data || !data.data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {data.data.map((product: any) => {
        // STRAPI v5 — fields SUNT DIRECT PE OBJECT
        const img =
          product?.images?.data?.[0]?.url ||
          "https://via.placeholder.com/300";

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            asChild
          >
            <TouchableOpacity style={{ marginBottom: 24 }}>
              <Image
                source={{ uri: img }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                }}
              />

              <Text style={{ fontSize: 20, marginTop: 8 }}>
                {product.title}
              </Text>

              <Text style={{ fontSize: 16, opacity: 0.7 }}>
                {product.price} €
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
}
