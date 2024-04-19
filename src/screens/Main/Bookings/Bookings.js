import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'

function Bookings() {
  const [items, setItems] = useState({})

  const today = new Date()

  const getBookingsByDay = (day) => {
    setTimeout(() => {
      setItems(newItems)
    }, 1000)
  }

  useEffect(() => {}, [])

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  )

  return (
    <Agenda
      items={{
        '2024-04-09': [{ name: '{Nome Reserva} {Horário} {Sala/Clinica}' }],
      }}
      loadItemsForMonth={(month) => {
        console.log('trigger items loading')
      }}
      selected={today}
      minDate="2024-04-01"
      renderItem={renderItem}
      renderEmptyDate={() => (
        <View>
          <Text>oi</Text>
        </View>
      )}
    />
  )
}

function timeToString(time) {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
})

export default Bookings
