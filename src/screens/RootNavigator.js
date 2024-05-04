import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Fragment } from 'react'
import MainNavigator from './Main/MainNavigator'
import AuthNavigator from './Auth/AuthNavigator'
import { useUserContext } from '../context/UserContext'
import AdminNavigator from './Admin/AdminNavigator'

const RootStack = createNativeStackNavigator()

function RootNavigator() {
  const { isAuthenticated, isAdminOrOwner } = useUserContext()

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen component={MainNavigator} name="Main" />
          {isAdminOrOwner && <RootStack.Screen component={AdminNavigator} name="Admin" />}
        </>
      ) : (
        <RootStack.Screen component={AuthNavigator} name="Auth" />
      )}
    </RootStack.Navigator>
  )
}

export default RootNavigator
