import { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./Main/MainNavigator";
import AuthNavigator from "./Auth/AuthNavigator";
import { useUserContext } from "../context/UserContext";

const RootStack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated } = useUserContext();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated || true ? (
        <RootStack.Screen component={MainNavigator} name="Main" />
      ) : (
        <RootStack.Screen component={AuthNavigator} name="Auth" />
      )}
    </RootStack.Navigator>
  );
}

export default RootNavigator;
