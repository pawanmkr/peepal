import http from "./http";

export enum UserRole {
    USER = "user",
    PROFESSIONAL = "professional",
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    dob: string;
    phoneCode: string;
    phoneNumber: string;
    role: UserRole;
}

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
        return http.post<User>("/api/v1/user", data);
    },

    getAllUsers: (offset: number, limit: number): Promise<User[]> => {
        return http.get<User[]>("/api/v1/user", { offset, limit });
    },

    getUserById: (id: string): Promise<User> => {
        return http.get<User>(`/api/v1/user/${id}`);
    },

    updateUser: (id: string, data: UpdateUser): Promise<User> => {
        return http.patch<User>(`/api/v1/user/${id}`, data);
    },

    deleteUser: (id: string): Promise<void> => {
        return http.delete<void>(`/api/v1/user/${id}`);
    },
};
