import { useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigator from './Main/MainNavigator'
import AuthNavigator from './Auth/AuthNavigator'

const RootStack = createNativeStackNavigator()

function RootNavigator () {

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}    
    >
      {false ? (
        <RootStack.Screen component={MainNavigator} name='Main' />
      ) : (
        <RootStack.Screen component={AuthNavigator} name='Auth' />
      )}
    </RootStack.Navigator>
  )
}

export default RootNavigator