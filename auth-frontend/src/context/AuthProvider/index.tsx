import React, {createContext, useEffect} from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);
    const payload: IUser = {access_token: response?.access_token, email};
    setUser({access_token: response?.access_token, email});
    setUserLocalStorage(payload);
    return !!response?.access_token
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  function isAuthenticated () {
    return !!user?.access_token;
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout, isAuthenticated, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};