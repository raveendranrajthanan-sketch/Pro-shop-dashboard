
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "pro-shop-users";
const SESSION_KEY = "pro-shop-session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "Administrator",
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, newUser])
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const matchedUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!matchedUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
