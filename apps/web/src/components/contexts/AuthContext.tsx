import React, { createContext, useState, ReactNode } from "react";

enum UserRole {
    TUTOR = "user",
    USER = "user",
}
type User = {
    id: string;
    role: UserRole;
};
type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => setUser(user);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, AuthContextType };
