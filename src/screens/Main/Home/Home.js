import React, { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import RoundCard from "./components/RoundCard";
import BookingCard from "./components/BookingCard";
import { useUserContext } from "../../../context/UserContext";
import { apiGetUpcomingBookings } from "../../../services/bookings";
import { Text, Loader, Card, Button } from "@components";

function Home() {
  const { logout, user } = useUserContext();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUpcomingBookings = async () => {
    try {
      const response = await apiGetUpcomingBookings();
      setUpcomingBookings(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUpcomingBookings();
  }, []);

  return (
    <Fragment>
      <View style={styles.topContainer}>
        <View style={styles.topRow}>
          <RoundCard
            text={`Créditos de Reserva: ${user.credits}`}
            icon="storefront-outline"
          />
          <RoundCard text="Horários Reservados: 5" icon="today-outline" />
        </View>
      </View>
      <Loader loading={isLoading} />
      <View style={styles.bottomContainer}>
        <View style={styles.nextBookingsCol}>
          <View style={styles.textRow}>
            <Text style={styles.mainText}>Próximas reservas</Text>
          </View>
          <ScrollView>
            {!isLoading && upcomingBookings.length ? (
              upcomingBookings.map((booking, index) => (
                <BookingCard
                  key={index}
                  icon="storefront-outline"
                  booking={booking}
                />
              ))
            ) : (
              <Card style={styles.emptyCardContent}>
                <Text style={styles.emptyCardText}>
                  Você não possui nenhuma reserva
                </Text>
              </Card>
            )}
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
  emptyCardContent: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  emptyCardText: {
    textAlign: "center",
    fontWeight: "semibold",
  },
  topContainer: {
    backgroundColor: "#479BA7",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  nextBookingsCol: {
    flexDirection: "column",
    marginTop: "16px",
  },
  scrollContainer: {
    flex: 1,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  textRow: {
    marginTop: 20,
  },
});

export default Home;

// const weeklyBookings = [
//   {
//     house: "Casa 1",
//     room: "Sala 3",
//     date: "23/05/12",
//     week_day: "Segunda",
//     starting_time: "14:10",
//     ending_time: "15:10",
//   },
//   {
//     house: "Casa 1",
//     room: "Sala 3",
//     date: "23/05/12",
//     week_day: "Segunda",
//     starting_time: "14:10",
//     ending_time: "15:10",
//   },
// ];
