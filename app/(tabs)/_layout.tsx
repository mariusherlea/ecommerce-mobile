//app/(tabs)/_layout.tsx
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useCartStore } from '@/src/store/cartStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const items = useCartStore((s) => s.items);
const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
   <Tabs.Screen
  name="cart"
  options={{
    title: "Cart",
    tabBarIcon: ({ color }) => (
      <View style={{ position: "relative", alignItems: "center" }}>
        
        {/* Iconița */}
        <TabBarIcon name="shopping-cart" color={color} />

        {/* Badge cu număr produse */}
        {cartCount > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -4,
              backgroundColor: "red",
              borderRadius: 10,
              minWidth: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 3,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </Text>
          </View>
        )}

        {/* Total price */}
        {totalPrice > 0 && (
          <Text
            style={{
              fontSize: 11,
              marginTop: 2,
              color,
              fontWeight: "600",
            }}
          >
            {totalPrice.toFixed(2)} €
          </Text>
        )}
      </View>
    ),
  }}
/>


      <Tabs.Screen
  name="product/[id]"
  options={{
    title: "Product",
    href: null, // IMPORTANT: ascunde din tab bar
  }}
/>

    </Tabs>
  );
}
