import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Text } from '@components';
import { formatDate, getWeekDay } from '../../../../helpers';
import moment from 'moment'
import { getBookingEndtimeFormatted } from '../helpers';

function BookingCard({ booking, icon }) {
  console.log({booking})


  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={24} style={styles.icon} />}
      <View style={styles.textContent}>
        <Text style={styles.text}>{booking.room_name}</Text>
        <Text style={styles.subtext}>{booking.clinic_name}</Text>
      </View>
      <View style={styles.rightTextContext}>
        <Text style={styles.weekAndDateText}>{getWeekDay(booking.date)}, {formatDate(booking.date)} </Text>
        <Text style={styles.text}> {booking.start_time} - {getBookingEndtimeFormatted(booking.start_time)} </Text>
      </View>
    </View>
  );
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
    elevation: 5,
    marginVertical: 8, 
  },
  weekAndDateText: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333',
  },
  textContent: {
    flex: 1, 
  },
  rightTextContext: {
    alignItems: "flex-end",
    flex: 1,
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333',
  },
  subtext: {
    fontSize: 14, 
    color: '#666', 
  },
  icon: {
    marginRight: 10, 
  },
});

export default BookingCard;
