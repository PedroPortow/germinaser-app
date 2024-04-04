import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import RoundCard from "./components/RoundCard";
import BookingCard from "./components/BookingCard";
import { useUserContext } from "../../../context/UserContext";
import { apiGetBookings } from "../../../services/bookings";
import { Text, Loader, Card, Button } from "@components";
import BookingModal from "../../../components/BookingModal/BookingModal";

function Home() {
  const { logout, user } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState({})
 
  const getBookings = async (page) => {
    setIsLoading(true);
    try {
      const perPage = 7;

      const response = await apiGetBookings({ page, perPage });

      if (page === 1) {
        setBookings(response.data.bookings);
      } else {
        setBookings((prev) => [...prev, ...response.data.bookings]);
      }
      setMetadata(response.data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ metadata });

  useEffect(() => {
    getBookings(1);
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)

  }

  const renderBooking = ({ item }) => (
    <BookingCard icon="storefront-outline" booking={item} onPress={() => handleViewBooking(item)} />
  );

  const closeBookingModal = () => {
    setBookingModalVisible(false);
  };

  console.log({selectedBooking})

  return (
    <Fragment>
      <View style={styles.topContainer}>
        <BookingModal visible={bookingModalVisible} onClose={closeBookingModal} selectedBooking={selectedBooking} />
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
          {bookings.length ? (
            <FlatList
              data={bookings}
              renderItem={renderBooking}
              keyExtractor={(booking) => String(booking.id)}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.05}
              contentContainerStyle={{ paddingBottom: 200 }}
            />
          ) : (
            <Card style={styles.emptyCardContent}>
              <Text style={styles.emptyCardText}>
                Você não possui nenhuma reserva
              </Text>
            </Card>
          )}
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
