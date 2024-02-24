import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import { Ionicons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: "#479BA7",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            background: "#fff"
          }
        }}
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name="Horários"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="alarm-outline" size={size} color={color} />
            ),
          }}
        />
        <Screen
          name="Minhas Reservas"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="albums-outline" size={size} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
  >
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#479BA7',
    }}>
      <Ionicons name="add" size={30} color="#fff" style={{ lineHeight: 60, textAlign: 'center' }} />
    </View>
  </TouchableOpacity>
);