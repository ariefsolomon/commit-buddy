import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    type DocumentData,
    type FirestoreDataConverter,
    type QueryDocumentSnapshot,
    type SnapshotOptions,
} from "firebase/firestore";
import { PartnerRequest, PartnerRequestCreate, PartnerRequestUpdate } from "./models";

const partnerRequestConverter: FirestoreDataConverter<PartnerRequest, Omit<PartnerRequest, "id">> = {
    toFirestore(request: PartnerRequest): Omit<PartnerRequest, "id"> {
        const { id, ...data } = request;
        return data;
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions,
    ): PartnerRequest {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            senderId: data.senderId,
            receiverId: data.receiverId,
            status: data.status,
            createdAt: data.createdAt,
        };
    },
};

const partnerRequestCollection = collection(db, "partnerRequests").withConverter(
    partnerRequestConverter,
);

export const partnerRequestService = {
    async sendInvite(request: PartnerRequestCreate): Promise<{ id: string } | null> {
        try {
            const createdPartnerRequest: PartnerRequest = {
                id: "", // Dummy ID, will be ignored by toFirestore
                ...request,
                status: "pending",
                createdAt: Date.now(),
            };

            const docRef = await addDoc(
                partnerRequestCollection,
                createdPartnerRequest,
            );
            return { id: docRef.id };
        } catch (error) {
            console.error("Error sending partner invite:", error);
            return null;
        }
    },

    async getIncomingRequestsForUser(userId: string): Promise<PartnerRequest[]> {
        try {
            const q = query(partnerRequestCollection, where("receiverId", "==", userId));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error("Error getting incoming partner requests:", error);
            return [];
        }
    },

    async getSentRequestsForUser(userId: string): Promise<PartnerRequest[]> {
        try {
            const q = query(partnerRequestCollection, where("senderId", "==", userId));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error("Error getting sent partner requests:", error);
            return [];
        }
    },

    async updateRequest(id: string, data: PartnerRequestUpdate): Promise<boolean> {
        try {
            await updateDoc(doc(db, "partnerRequests", id), data);
            return true;
        } catch (error) {
            console.error(`Error updating partner request ${id}:`, error);
            return false;
        }
    },
};
