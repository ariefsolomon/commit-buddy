import { auth } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";

export const authService = {
    login: async (email: string, password: string): Promise<User> => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    },

    register: async (email: string, password: string): Promise<User> => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    },

    resetPassword: async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    },

    logout: async () => {
        await signOut(auth);
    },
};
