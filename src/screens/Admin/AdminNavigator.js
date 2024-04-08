import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import Clinics from './Clinics'
import Rooms from './Rooms'
import Users from './Users/Users'

const Tab = createBottomTabNavigator()

function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#479BA7',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        // headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          background: '#fff',
        },
      }}
      initialRouteName="Home"
      backBehavior="history"
    >
      <Tab.Screen
        name="Usuários"
        component={Users}
        options={{
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Salas"
        component={Rooms}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="door-open" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Clínicas"
        component={Clinics}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="clinic-medical" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AdminNavigator
