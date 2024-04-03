import React, { Fragment } from 'react';
import {  View, StyleSheet, ScrollView } from 'react-native';
import RoundCard from './components/RoundCard';
import BookingCard from './components/BookingCard';
import Text from '../../../components/Text/Text';

function Home() {
  

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

  return (
    <Fragment>

      <View style={styles.topContainer}>
        <View style={styles.topRow}>
          <RoundCard 
            text="Créditos de Reserva: 3" 
            icon="storefront-outline" 
          />
          <RoundCard 
            text="Horários Reservados: 5" 
            icon="today-outline" 
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.nextBookingsCol}>
          <View style={styles.textRow}>
            <Text style={styles.mainText}>
              Próximas reservas
            </Text>
          </View>
          <ScrollView>
            {weeklyBookings.map((booking, index) => (
              <BookingCard key={index} icon="storefront-outline" booking={booking} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topContainer: {
    backgroundColor: "#479BA7",
    paddingTop: 100,
    paddingHorizontal: 20
  },
  topRow: {
    flexDirection: "row",
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  nextBookingsCol: {
    flexDirection: "column",
    marginTop: "16px",
  },
  scrollContainer: {
    flex: 1
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  textRow: {
    marginTop: 20,
    
  }
})

export default Home;
