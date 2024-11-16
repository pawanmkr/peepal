import http from "./http";

export enum ChargeType {
    HOURLY = "hourly",
    PER_SESSION = "per_session",
    PER_MONTH = "per_month",
    PER_WEEK = "per_week",
    PER_DAY = "per_day",
}

export type User = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    dob?: string;
    phoneCode?: string;
    phoneNumber?: string;
    password: string;
    description: string;
    skills: string;
    rating: string;
    demoVideo: string;
    location: string;
    languages: string;
    currency: string;
    charge: number;
    chargeType: ChargeType;
};

export interface CreateUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    dob: string;
    phoneCode: string;
    phoneNumber: string;
    password: string;
}

export interface UpdateUser {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    dob?: string;
    phoneCode?: string;
    phoneNumber?: string;
}

export const userApi = {
    createUser: (data: CreateUser): Promise<User> => {
        return http.post<User>("/user", data);
    },

    getAllUsers: (offset: number, limit: number): Promise<User[]> => {
        return http.get<User[]>("/user", { offset, limit });
    },

    getUserById: (id: string): Promise<User> => {
        return http.get<User>(`/user/${id}`);
    },

    updateUser: (id: string, data: UpdateUser): Promise<User> => {
        return http.patch<User>(`/user/${id}`, data);
    },

    deleteUser: (id: string): Promise<void> => {
        return http.delete<void>(`/user/${id}`);
    },

    getRecommededUsers: (
        userId: string | null, // null in case of user is not Logged in and still app shows recommendations
        offset: number,
        limit: number
    ): Promise<User[]> => {
        return http.get<User[]>(`/user/recommendations`, {
            userId,
            offset,
            limit,
        });
    },

    searchUsers: (
        query: string,
        offset: number,
        limit: number
    ): Promise<{ users: User[]; total: number }> => {
        return http.get<{ users: User[]; total: number }>("/user/search", {
            q: query,
            offset,
            limit,
        });
    },
};
