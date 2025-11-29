import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Habit, HabitCreate, HabitUpdate } from "./models";

const habitCollection = collection(db, "habits");

export const habitService = {
    async createHabit(habit: HabitCreate): Promise<{ id: string }> {
        const docRef = await addDoc(habitCollection, {
            ...habit,
            createdAt: Date.now(),
            active: true,
        });
        return { id: docRef.id };
    },

    async updateHabit(id: string, data: HabitUpdate): Promise<void> {
        const habitRef = doc(db, "habits", id);
        await updateDoc(habitRef, data);
    },

    async getHabitsForUser(userId: string): Promise<Habit[]> {
        const q = query(habitCollection, where("userId", "==", userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Habit[];
    },
};
