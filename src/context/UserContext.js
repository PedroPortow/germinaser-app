import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ROLES } from '@constants'
import { hasRole } from '@helpers'
import { apiPostLogin } from '../services/auth'
import { apiGetUserData } from '../services/user'
import events from '../events'

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    events.on('logout', logout)

    return () => {
      events.off('logout', logout)
    }
  }, [])

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken')

      if (storedToken) {
        getUserData()
        setIsAuthenticated(true)
        setToken(storedToken)
      } else {
        setIsAuthenticated(false)
      }
    }

    loadToken()
  }, [])

  const isAdminOrOwner = useMemo(() => hasRole(user.role, [ROLES.ADMIN, ROLES.OWNER]), [user.role])

  const getUserData = async () => {
    try {
      const response = await apiGetUserData()

      setUser(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await apiPostLogin(email, password)

      const token = response.headers.authorization

      setUser(response.data)
      await SecureStore.setItemAsync('userToken', token)

      setToken(token)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login falhou:', error.response)
      throw error
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken')
    setToken(null)
    setIsAuthenticated(false)
  }

  const values = useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
      user,
      isAdminOrOwner,
    }),
    [token, isAuthenticated, login, logout, user, isAdminOrOwner]
  )

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
