import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Schedule from "../screens/Schedule/Schedule";
import Bookings from "../screens/Bookings/Bookings";
import { Ionicons } from '@expo/vector-icons';
import BookingModal from "../components/BookingModal/BookingModal";
import { TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
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
      {/* Defina suas Screens aqui como antes */}
      {/* Exemplo: */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Adicione as outras Screens aqui */}
    </Tab.Navigator>
  );
}

export default AppStack