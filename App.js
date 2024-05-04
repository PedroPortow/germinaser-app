import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { loadFonts } from '@helpers'
import { NativeBaseProvider } from 'native-base'
import RootNavigator from './src/screens/RootNavigator'
import { UserContextProvider } from './src/context/UserContext'
import './src/config/localConfig'
import { ToastProvider } from './src/context/ToastContext'
import { FullScreenModalProvider } from './src/context/FullScreenModalContext'

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
      <FullScreenModalProvider>
        <ToastProvider>
          <UserContextProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </UserContextProvider>
        </ToastProvider>
      </FullScreenModalProvider>
    </NativeBaseProvider>
  )
}

export default App
