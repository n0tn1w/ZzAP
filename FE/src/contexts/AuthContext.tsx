import React, { useState } from "react";

export type User = {
  username: string;
};

type AuthContext = {
  isAuth: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuhtContext = React.createContext<AuthContext | null>(null);

export const useAuth = () => {
  const authContext = React.useContext(AuhtContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthProvider>");
  }

  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    setIsAuth(true);
    setUser({ username });
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuhtContext.Provider
      value={{
        isAuth,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuhtContext.Provider>
  );
};
