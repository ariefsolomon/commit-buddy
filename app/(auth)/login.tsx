import { authService } from "@/services/authService";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	async function handleLogin() {
		if (!email.trim()) {
			setError("Email is required");
			return;
		}
		if (!validateEmail(email)) {
			setError("Please enter a valid email address");
			return;
		}
		if (!password) {
			setError("Password is required");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}

		setError("");
		setLoading(true);
		try {
			await authService.login(email, password);
			router.replace("/"); // Masuk ke Tabs Home
		} catch (err: any) {
			setError("Failed to login. Please check your credentials.");
			console.log("Login error:", err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={{ padding: 24, flex: 1, justifyContent: "center" }}>
			<Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>
				Commit Buddy
			</Text>

			<TextInput
				placeholder="Email"
				autoCapitalize="none"
				keyboardType="email-address"
				value={email}
				onChangeText={(text) => {
					setEmail(text);
					if (error) setError("");
				}}
				style={{
					borderWidth: 1,
					padding: 12,
					marginBottom: 12,
					borderRadius: 8,
				}}
			/>

			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={(text) => {
					setPassword(text);
					if (error) setError("");
				}}
				style={{
					borderWidth: 1,
					padding: 12,
					marginBottom: 12,
					borderRadius: 8,
				}}
			/>

			{error ? (
				<Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
			) : null}

			<TouchableOpacity
				onPress={handleLogin}
				disabled={loading}
				style={{
					backgroundColor: loading ? "#ccc" : "#000",
					padding: 14,
					borderRadius: 8,
					marginBottom: 12,
				}}
			>
				<Text
					style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
				>
					{loading ? "Logging in..." : "Login"}
				</Text>
			</TouchableOpacity>

			<Link href="/register" style={{ marginTop: 24, textAlign: "center" }}>
				Belum punya akun? Daftar
			</Link>
		</View>
	);
}

