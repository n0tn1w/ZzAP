import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/secureStore";

export type User = {
  username: string;
};

type AuthContextProps = {
  isAuth: boolean;
  token: string | null;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthProvider>");
  }

  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    setIsAuth(true);
    const username = jwtDecode(token).sub!;
    setToken(token);
    saveToken(token);
    setUser({ username });
  };

  const logout = async () => {
    setIsAuth(false);
    setUser(null);
    await removeToken();
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token.success) login(token.value!);
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
