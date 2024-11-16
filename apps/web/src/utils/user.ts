import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    id: string;
    role: string;
}

export function getLoggedInUser(): JwtPayload {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token) as JwtPayload;
        return decoded;
    }
    throw new Error("User not logged in");
}
