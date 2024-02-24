import React from 'react';
import { Button, View, StyleSheet, ScrollView } from 'react-native';
import RoundCard from './components/RoundCard';
import ReservationCard from './components/ReservationCard';
import Text from '../../components/Text/Text';

function Home({ navigation }) {

  const weeklyReservations = [
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
    <>
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
      <View style={styles.nextReservationsCol}>
        <View style={styles.textRow}>
          <Text style={styles.mainText}>
            Próximas reservas
          </Text>
        </View>
        <ScrollView>
          {weeklyReservations.map((reservation, index) => (
            <ReservationCard key={index} icon="storefront-outline" reservation={reservation} />
          ))}
        </ScrollView>
      </View>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
    </>
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
  nextReservationsCol: {
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
