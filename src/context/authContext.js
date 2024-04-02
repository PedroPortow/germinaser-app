import React, { useMemo } from "react";
import { useReducer } from "react";
import { createContext, useState, useContext } from "react";
import { auth } from '@services'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  
  const login = async (email, password) => {
    try {
      const response = await auth.login(email, password);

      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      setUser({ ...response.data.user, token });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

