import http from "./http";
import { User } from "./user";

type ChargeType =
  | "hourly"
  | "per_session"
  | "per_month"
  | "per_week"
  | "per_day";

export interface FormalEducation {
  id: string;
  qualification: string;
  institution: string;
  year: number;
  subjects: string;
}
export interface Tutor {
  id: string;
  description: string;
  experience: number;
  skills: string;
  rating: string; // Consider changing this to a number if rating is numeric
  video: string;
  location: string;
  languages: string;
  availability: string;
  currency: string;
  charge: string; // Consider changing this to a number if charge is numeric
  chargeType: ChargeType;
  days: string;
  startTime: string;
  endTime: string;
  formalEducation: FormalEducation[];
  user: User;
}
export interface CreateFormalEducation extends Omit<FormalEducation, "id"> {}
export interface CreateTutor extends Omit<Tutor, "id" | "rating" | "user"> {}
export interface UpdateTutor extends Partial<CreateTutor> {}

// Slot export Interfaces
export interface CreateSlot {
  rule: string;
  isAvailable: boolean;
  userType: "tutor" | "user";
  tutorId?: string;
  userId: string;
}

export interface UpdateSlot {
  rule?: string;
  isAvailable?: boolean;
}

export const tutorApi = {
  createTutor: (userId: string, data: CreateTutor): Promise<Tutor> => {
    return http.post<Tutor>("/tutor", data, {
      params: { user: userId },
    });
  },

  getAllTutors: (offset: number, limit: number): Promise<Tutor[]> => {
    return http.get<Tutor[]>("/tutor", { offset, limit });
  },

  getTutorById: (id: string): Promise<Tutor> => {
    return http.get<Tutor>(`/tutor/${id}`);
  },

  searchTutors: (
    query: string,
    offset: number,
    limit: number
  ): Promise<Tutor[]> => {
    return http.get<Tutor[]>("/tutor/search", { q: query, offset, limit });
  },

  updateTutor: (id: string, data: UpdateTutor): Promise<Tutor> => {
    return http.patch<Tutor>(`/tutor/${id}`, data);
  },

  deleteTutor: (id: string): Promise<void> => {
    return http.delete<void>(`/tutor/${id}`);
  },
};
