import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#000",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="partner"
				options={{
					title: "Partner",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="people-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="report"
				options={{
					title: "Report",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="bar-chart-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="settings-outline" size={size} color={color} />
					),
				}}
			/>``
		</Tabs>
	);
}
