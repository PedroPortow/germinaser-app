import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Home from './Home/Home'
import { useState } from 'react'
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons'
import BookingModal from "../../components/BookingModal/BookingModal";
const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Settings Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <BookingModal 
        visible={isModalVisible} 
        onClose={toggleModal}
      />
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#479BA7",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        headerShown: false,
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
       <Tab.Screen
        name="ActionButton"
        component={EmptyView} 
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} onPress={toggleModal} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </>
  );
};

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View style={{
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: '#479BA7',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Ionicons name="add" size={30} color="#fff"  />
    </View>
  </TouchableOpacity>
);

const EmptyView = () => {
  return null
}

export default MainNavigator;