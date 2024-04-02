import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { apiPostLogin } from "../services/auth";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const storedToken = await SecureStore.getItemAsync("userToken");
  //     if (storedToken) {
  //       setToken(storedToken);
  //       setIsAuthenticated(true);
  //     }
  //   };
  //
  //   loadToken();
  // }, []);

  const login = async (email, password) => {
    try {
      const response = await apiPostLogin(email, password);

      // console.log({ response });
      console.log(response.data);
      const { token } = response.data;
      console.log({ token });
      await SecureStore.setItemAsync("userToken", token);
      console.log(SecureStore.getItem("userToken"));
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login falhou:", error);
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  const values = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
