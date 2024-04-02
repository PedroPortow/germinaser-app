import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Login from './Login/Login'

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
