import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Text } from 'native-base'
import { formatDate, getWeekDay, getBookingEndtimeFormatted } from '@helpers'

function BookingCard({ booking, icon, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon && <AntDesign name={icon} size={22} style={styles.icon} />}
      <View style={styles.textContent}>
        <Text style={styles.text}>{booking.name}</Text>
        <Text style={styles.subtext}>
          {booking.clinic_name}, {booking.room_name}
        </Text>
      </View>
      <View style={styles.rightTextContext}>
        <Text style={styles.weekText}>
          {getWeekDay(booking.date)}, {formatDate(booking.date)}{' '}
        </Text>
        <Text style={styles.timeText}>
          {' '}
          {booking.start_time} - {getBookingEndtimeFormatted(booking.start_time)}{' '}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 8,
  },
  weekText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
  textContent: {
    flex: 1,
  },
  rightTextContext: {
    alignItems: 'flex-end',
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
  },
  timeText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    marginRight: 10,
  },
})

export default BookingCard
