import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { loadFonts } from '@helpers'
import RootNavigator from './src/screens/RootNavigator'
import { UserContextProvider } from './src/context/UserContext'
import './src/config/localConfig'
import { ToastProvider } from './src/context/ToastContext'
import { CreateBookingModalProvider } from './src/context/CreateBookingModalContext'
import { NativeBaseProvider, Box } from "native-base";


function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <NativeBaseProvider>
      <ToastProvider>
        <CreateBookingModalProvider>
          <UserContextProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </UserContextProvider>
        </CreateBookingModalProvider>
      </ToastProvider>
    </NativeBaseProvider>
  )
}

export default App
