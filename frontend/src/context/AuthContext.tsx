import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser { email: string; token: string; role: string; }
interface AuthContextType {
  user: AuthUser | null;
  login: (data: AuthUser) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data: AuthUser) => {
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  const isAdmin = () => user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}