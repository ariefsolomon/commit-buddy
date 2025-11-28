import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
				}}
			>
				<Stack.Screen name="login" />
				<Stack.Screen name="register" />
				<Stack.Screen name="forgot" />
			</Stack>
		</View>
	);
}
