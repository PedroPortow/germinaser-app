import React from 'react';
import { Button, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text } from '@components';
import BookingCard from '../Home/components/BookingCard';

function Bookings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.previousReservationsColumn}>
        <Text style={styles.mainText}>Proximas Reservas</Text>
        <ScrollView nestedScrollEnabled={true}>
          {weeklyBookings.map((booking, index) => (
            <BookingCard key={index} icon="storefront-outline" booking={booking} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.nextReservationsColumn} nestedScrollEnabled={true}>
        <Text style={styles.mainText}>Histórico Reservas</Text>
        <ScrollView>
          {weeklyBookings.map((booking, index) => (
            <BookingCard key={index} icon="storefront-outline" booking={booking} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20
  },
  previousReservationsColumn: {
    flexDirection: "column"
  },
  nextReservationsColumn: {
    flexDirection: "column",
    marginTop: 20
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

const weeklyBookings = [
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },
  {
    house: "Casa 1",
    room: "Sala 3",
    date: "23/05/12",
    week_day: "Segunda",
    starting_time: "14:10",
    ending_time: "15:10"
  },

]

export default Bookings;
