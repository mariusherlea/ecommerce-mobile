import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { register } from "../src/api/auth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await register(email, password, username);
    router.replace("/login"); // după register → login
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Register</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
