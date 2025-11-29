import { db } from "@/lib/firebase";
import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
import { Session, SessionCreate, SessionEnd } from "./models";

const sessionCollection = collection(db, "sessions");

export const sessionService = {
    async startSession(session: SessionCreate): Promise<{ id: string }> {
        const docRef = await addDoc(sessionCollection, {
            ...session,
            startAt: Date.now(),
            status: "pending",
            verified: false,
            checkpoints: [],
            afkEvents: 0,
        });
        return { id: docRef.id };
    },

    async endSession(id: string, updates: SessionEnd): Promise<void> {
        const sessionRef = doc(db, "sessions", id);

        await runTransaction(db, async (transaction) => {
            const sessionDoc = await transaction.get(sessionRef);
            if (!sessionDoc.exists()) {
                throw new Error("Session does not exist!");
            }

            const sessionData = sessionDoc.data() as Session;
            const endAt = Date.now();
            const duration = endAt - sessionData.startAt;

            transaction.update(sessionRef, {
                ...updates,
                endAt,
                duration,
            });
        });
    },
};
