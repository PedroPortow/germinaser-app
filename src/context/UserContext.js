import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { apiPostLogin } from "../services/auth";
import { apiGetUserData } from "../services/user";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("userToken");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);

        if(!Object.keys(user).length){
          getUserData()
        }
      }
    };

    loadToken();
  }, []);

  const getUserData = async() => {
    try {
      const response = await apiGetUserData()

      setUser(response.data)
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await apiPostLogin(email, password);

      const token = response.headers.authorization; 

      setUser(response.data)
      await SecureStore.setItemAsync("userToken", token);
      
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login falhou:", error.response);
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
    user,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
