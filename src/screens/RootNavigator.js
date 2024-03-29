import { useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigator from './Main/MainNavigator'

const RootStack = createNativeStackNavigator()

function RootNavigator () {

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}    
    >
       <RootStack.Screen component={MainNavigator} name='Main' />
      {/* {true ? (
        <RootStack.Screen component={MainNavigator} name='Main' />
      ) : (
        <RootStack.Screen component={AuthNavigator} name='Auth' />
      )} */}
    </RootStack.Navigator>
  )
}

export default RootNavigator