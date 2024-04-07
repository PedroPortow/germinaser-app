// ./src/utils/loadFonts.js
import * as Font from 'expo-font';

export default async function loadFonts() {
  await Font.loadAsync({
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-ExtraLight': require('../assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
  });
}
