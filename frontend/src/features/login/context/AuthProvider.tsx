import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUser] = useState<string | null>(null);

  const saveUserAndToken = (newUsername: string | null, newToken: string | null) => {
    if (newToken === null) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("token", newToken || "");
      sessionStorage.setItem("username", newUsername || "");
    }
    setToken(newToken);
    setUser(newUsername);
  };

  const storedToken = token || sessionStorage.getItem("token");
  const storedUsername = username || sessionStorage.getItem("username");

  return (
    <AuthContext.Provider value={{ token: storedToken, username: storedUsername, saveUserAndToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;