import { useUser } from "@/hooks/useUser";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!user && !inAuthGroup) {
            router.replace("/login");
        }

        if (user && inAuthGroup) {
            router.replace("/");
        }
    }, [user, loading, router, segments]);

    return <>{children}</>;
}
