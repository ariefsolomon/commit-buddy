import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const sessionCollection = collection(db, "sessions");

export const reportService = {
    async getSessionsForUser(userId: string) {
        const q = query(sessionCollection, where("userId", "==", userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as any[];
    },

    async getDailyReport(userId: string, date: Date) {
        const allSessions = await this.getSessionsForUser(userId);

        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        return allSessions.filter((session) => {
            const start = new Date(session.startAt);
            return start >= dayStart && start <= dayEnd;
        });
    },

    async getWeeklyReport(userId: string, date: Date) {
        const allSessions = await this.getSessionsForUser(userId);

        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        return allSessions.filter((session) => {
            const start = new Date(session.startAt);
            return start >= weekStart && start <= weekEnd;
        });
    },

    async getTotalMinutes(userId: string) {
        const sessions = await this.getSessionsForUser(userId);

        return sessions
            .filter((s) => s.status === "completed")
            .reduce((sum, s) => sum + (s.duration || 0), 0);
    },

    async getStreak(userId: string) {
        const sessions = await this.getSessionsForUser(userId);

        const dates = new Set(
            sessions
                .filter((s) => s.status === "completed")
                .map((s) => new Date(s.startAt).toDateString())
        );

        let streak = 0;
        let current = new Date();

        while (dates.has(current.toDateString())) {
            streak++;
            current.setDate(current.getDate() - 1);
        }

        return streak;
    }
};
