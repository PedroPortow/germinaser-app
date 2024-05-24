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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync('userToken')
      if (token) {
        await getUserData()
        setIsAuthenticated(true)
      }
    }

    checkAuthentication()

    events.on('logout', logout)
    return () => {
      events.off('logout', logout)
    }
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
    const response = await apiPostLogin(email, password)

    const token = response.headers.authorization

    setUser(response.data)

    setIsAuthenticated(true)
    await SecureStore.setItemAsync('userToken', token)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken')
    setIsAuthenticated(false)
  }

  const values = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      user,
      getUserData,
      isAdminOrOwner,
    }),
    [isAuthenticated, login, logout, user, isAdminOrOwner]
  )

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
