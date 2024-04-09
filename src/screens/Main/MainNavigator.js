import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Fragment, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Text } from '@ui-kitten/components'
import Home from './Home/Home'
import Bookings from './Bookings/Bookings'
import CreateBookingModal from '../../components/CreateBookingModal/CreateBookingModal'
import Account from './Account/Account'

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

function MainNavigator() {
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <>
      <CreateBookingModal visible={isModalVisible} onClose={toggleModal} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#479BA7',
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            background: '#fff',
          },
        }}
        detachInactiveScreens
        initialRouteName="Home"
        backBehavior="history"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
          }}
        />

        <Tab.Screen
          name="Horários"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ size, color }) => <Feather name="calendar" size={size} color={color} />,
          }}
        />

        <Tab.Screen
          name="ActionButton"
          component={EmptyView}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} onPress={toggleModal} />,
            tabBarIcon: ({ color, size }) => <Feather name="add" size={size} color={color} />,
          }}
        />

        <Tab.Screen
          name="Reservas"
          component={Bookings}
          options={{
            tabBarIcon: ({ size, color }) => <Feather name="archive" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Conta"
          component={Account}
          options={{
            tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
          }}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </>
  )
}

function CustomTabBarButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={tabBarButtonStyle.buttonPosition}>
      <View style={tabBarButtonStyle.button}>
        <Feather name="plus" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  )
}

const tabBarButtonStyle = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#479BA7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPosition: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function EmptyView() {
  return null
}

export default MainNavigator
