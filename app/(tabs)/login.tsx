import { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";

export default function LoginScreen() {
  const { user, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password);
      // 🔥 NU redirect aici
      // OrdersScreen se va reranda automat
    } catch (err: any) {
      Alert.alert("Login failed", err.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}
