export type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface Habit {
    id: string;
    userId: string;
    partnerId?: string;
    title: string;
    description?: string;
    schedule: Day[];
    targetMinutes: number;
    createdAt: number;
    active: boolean;
}

export type HabitCreate = Omit<Habit, "id" | "createdAt" | "active">;
export type HabitUpdate = Partial<Pick<Habit, "title" | "description" | "schedule" | "targetMinutes" | "active">>;

export interface Session {
    id: string;
    habitId: string;
    userId: string;
    partnerId: string;
    startAt: number;
    endAt?: number;
    duration?: number;
    goalMinutes?: number;
    status: "pending" | "completed" | "failed" | "afk_detected";
    proofImage?: string;
    afkEvents?: number;
    checkpoints?: Array<{
        timestamp: number;
        screenOn: boolean;
        appInForeground: boolean;
    }>;
    verified: boolean;
    verificationMessage?: string;
}

export type SessionCreate = Pick<Session, "habitId" | "userId" | "partnerId" | "goalMinutes">;
export type SessionEnd = Pick<Session, "status" | "proofImage" | "afkEvents" | "checkpoints">;


export interface PartnerRequest {
    id: string;
    senderId: string;
    receiverId: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: number;
}

export type PartnerRequestCreate = Omit<PartnerRequest, "id" | "createdAt" | "status">;
export type PartnerRequestUpdate = Pick<PartnerRequest, "status">;


export interface VerifyLog {
    id: string;
    userId: string;
    partnerId: string;
    sessionId: string;
    status: "approved" | "rejected" | "flagged";
    comment?: string;
    createdAt: number;
}

export type VerifyLogCreate = Omit<VerifyLog, "id" | "createdAt">;
