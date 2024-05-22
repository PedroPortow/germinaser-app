import { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Home from './Home'
import UserBookings from './UserBookings'
import Account from './Account'
import Schedule from './Schedule'
import { useFullScreenModal } from '../../context/FullScreenModalContext'
import { CreateBookingModal } from '../../components'

const Tab = createBottomTabNavigator()

function MainNavigator() {
  const { showModal, hideModal } = useFullScreenModal()
  const [refetchTrigger, setRefetchTrigger] = useState(0) 

  const handleOpenCreateBookingModal = () => {
    showModal({
      title: "Nova Reserva",
      children: <CreateBookingModal onClose={hideModal} onCreate={() => setRefetchTrigger(prev => prev + 1)} />,
    })
  }

  return (
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
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
        }}
      >
        {props => <Home {...props} refetch={refetchTrigger} />}
      </Tab.Screen>

      <Tab.Screen
        name="Horários"
        component={Schedule}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="calendar" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="ActionButton"
        component={EmptyView}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} onPress={handleOpenCreateBookingModal} />
          ),
          tabBarIcon: ({ color, size }) => <Feather name="add" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Reservas"
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="archive" size={size} color={color} />,
        }}
      >
        {props => <UserBookings {...props} refetch={refetchTrigger} />}
      </Tab.Screen>
      <Tab.Screen
        name="Conta"
        component={Account}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
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
