import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { VerifyLog } from "./models";

const verifyLogCollection = collection(db, "verifyLogs");

export const verifyLogService = {
    async createLog(log: Omit<VerifyLog, "id" | "createdAt">) {
        const docRef = await addDoc(verifyLogCollection, {
            ...log,
            createdAt: Date.now(),
        });
        return { id: docRef.id };
    },
};
