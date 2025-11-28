import { authService } from "@/services/authService";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotScreen() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function sendReset() {
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await authService.resetPassword(email);
            Alert.alert("Success", "Password reset email sent!");
        } catch (e) {
            setError("Failed to send reset email. Please try again.");
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ padding: 24, flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
                Reset Password
            </Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
            />

            {error ? (
                <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
            ) : null}

            <TouchableOpacity
                onPress={sendReset}
                disabled={loading}
                style={{
                    backgroundColor: loading ? "#ccc" : "#007bff",
                    padding: 12,
                    borderRadius: 4,
                    marginBottom: 24
                }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>
                    {loading ? "Sending..." : "Kirim Email Reset"}
                </Text>
            </TouchableOpacity>

            <Link href="/login" style={{ marginTop: 24, textAlign: "center" }}>
                Kembali ke Login
            </Link>
        </View>
    );
}
