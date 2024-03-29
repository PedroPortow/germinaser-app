import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";

const Navigation = () => {
  const isAuth = true

  return (
    <NavigationContainer>
      <AppStack />
      {/* {isAuth ? <AppStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
}

export default Navigation
