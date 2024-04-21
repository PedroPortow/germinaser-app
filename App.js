import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { loadFonts } from '@helpers'
import RootNavigator from './src/screens/RootNavigator'
import { UserContextProvider } from './src/context/UserContext'
import { default as mapping } from './mapping.json'

import './src/config/localConfig'
import { ToastProvider } from './src/context/ToastContext'

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
    <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
      <ToastProvider>
        <UserContextProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </UserContextProvider>
      </ToastProvider>
    </ApplicationProvider>
  )
}

export default App
