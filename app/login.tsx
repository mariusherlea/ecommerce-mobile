import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../src/context/AuthContext";

export default function LoginScreen() {
  const { user, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Redirect href="/(tabs)" />;

  async function handleLogin() {
    await signIn(email, password);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
