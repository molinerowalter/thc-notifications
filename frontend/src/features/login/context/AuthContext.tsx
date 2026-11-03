import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  saveUserAndToken: (newUsername: string | null, newToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

