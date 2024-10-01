import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    id: string;
    role: string;
}

export function getLoggedInUser(): JwtPayload | null {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token) as JwtPayload;
        console.log(decoded);
        return decoded;
    }
    return null;
}
