// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { User } from "../models/user";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Replace 'your-api-endpoint/login' with your actual login endpoint
      const response = await axios.post<User>(
        "http://localhost:5000/api/account/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      } else {
        // Handle login failure
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Replace 'your-api-endpoint/logout' with your actual logout endpoint
      const response = await axios.post("https://your-api-endpoint/logout");

      if (response.status === 200) {
        setUser(null);
      } else {
        // Handle logout failure
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error
    }
  };

  const contextValue: AuthContextProps = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
