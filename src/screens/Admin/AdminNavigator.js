import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Clinics from './Clinics/Clinics'
import Rooms from './Rooms/Rooms'
import Users from './Users/Users'
import Bookings from './Bookings/Bookings'

const Tab = createBottomTabNavigator()

function AdminNavigator() {
  const navigation = useNavigation()

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
        zIndex: 0  // Set a negative zIndex to render other components above
      },
    }}
    detachInactiveScreens
    initialRouteName="Users"
    backBehavior="history"
    >
      <Tab.Screen
        name="Usuários"
        component={Users}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Salas"
        component={Rooms}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="door-open" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Reservas"
        component={Bookings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="archive" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Clínicas"
        component={Clinics}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="clinic-medical" size={size} color={color} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="ActionButton"
        component={EmptyView}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} onPress={() => navigation.navigate('Main')} />
          ),
        }}
      /> 
    </Tab.Navigator>
  )
}

function CustomTabBarButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'center',
        marginRight: 16,
      }}
    >
      <Feather name="log-out" size={22} color="gray" />
    </TouchableOpacity>
  )
}

function EmptyView() {
  return null
}

export default AdminNavigator
