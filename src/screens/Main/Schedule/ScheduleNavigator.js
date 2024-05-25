import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Schedule from './Schedule'
import SelectClinicPage from './components/SelectClinicPage'

const Stack = createStackNavigator()

function CustomHeader({ text }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  )
}

function ScheduleNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectClinicPage"
        component={SelectClinicPage}
        options={{
          header: () => <CustomHeader text={'Selecione uma Clínica'} />,
        }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          header: () => <CustomHeader text={'Clinica 1'} />,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#479BA7',
    padding: 10,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ScheduleNavigator
