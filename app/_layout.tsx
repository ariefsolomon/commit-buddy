import AuthGate from "@/components/AuthGate";
import { UserProvider } from "@/context/UserContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthGate>
        <Slot />
      </AuthGate>
    </UserProvider>
  );
}
