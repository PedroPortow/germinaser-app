import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font';
import { Text, View } from 'react-native'; 
import RootNavigator from './src/screens/RootNavigator';
import { LocaleConfig } from 'react-native-calendars';
import { AuthContextProvider } from './src/context/authContext';

async function loadFonts() {
  await Font.loadAsync({
    'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('./src/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-ExtraLight': require('./src/assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-Light': require('./src/assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('./src/assets/fonts/Nunito-Medium.ttf'),
  });
}


LocaleConfig.locales.fr = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez."
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "fr";

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }

  return ( 
    <AuthContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContextProvider>
 
  );
}

export default App;
