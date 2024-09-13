import http from "./http";
import { User } from "./user";

export enum ProfessionalChargeType {
    Hourly = "hourly",
    PerSession = "per_session",
    PerMonth = "per_month",
    PerWeek = "per_week",
    PerDay = "per_day",
}

export interface FormalEducation {
    id: string;
    qualification: string;
    institution: string;
    year: number;
    subjects: string;
}
export interface Professional {
    id: string;
    description: string;
    experience: number;
    skills: string;
    rating: string;
    video: string;
    location: string;
    languages: string;
    currency: string;
    charge: number;
    chargeType: ProfessionalChargeType;
    formalEducation: FormalEducation[];
    user: User;
}
export interface CreateFormalEducation extends Omit<FormalEducation, "id"> {}
export interface CreateProfessional
    extends Omit<Professional, "id" | "rating" | "user" | "formalEducation"> {
    formalEducation: CreateFormalEducation[];
}
export interface UpdateProfessional extends Partial<CreateProfessional> {}

// Slot export Interfaces
export interface CreateSlot {
    rule: string;
    isAvailable: boolean;
    userType: "professional" | "user";
    professionalId?: string;
    userId: string;
}

export interface UpdateSlot {
    rule?: string;
    isAvailable?: boolean;
}

export const professionalApi = {
    createProfessional: (
        userId: string,
        data: CreateProfessional
    ): Promise<Professional> => {
        return http.post<Professional>("/professional", data, {
            params: { user: userId },
        });
    },

    getAllProfessionals: (
        offset: number,
        limit: number
    ): Promise<Professional[]> => {
        return http.get<Professional[]>("/professional", { offset, limit });
    },

    getRecommendedProfessionals: (
        offset: number,
        limit: number
    ): Promise<Professional[]> => {
        return http.get<Professional[]>("/professional", { offset, limit });
    },

    getProfessionalById: (id: string): Promise<Professional> => {
        return http.get<Professional>(`/professional/${id}`);
    },

    searchProfessionals: (
        query: string,
        offset: number,
        limit: number
    ): Promise<{ professionals: Professional[]; total: number }> => {
        return http.get<{ professionals: Professional[]; total: number }>(
            "/professional/search",
            {
                q: query,
                offset,
                limit,
            }
        );
    },

    updateProfessional: (
        id: string,
        data: UpdateProfessional
    ): Promise<Professional> => {
        return http.patch<Professional>(`/professional/${id}`, data);
    },

    deleteProfessional: (id: string): Promise<void> => {
        return http.delete<void>(`/professional/${id}`);
    },
};
