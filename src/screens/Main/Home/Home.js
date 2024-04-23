import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Text, Loader, Card, RoundCard, BookingModal } from '@components'
import { useUserContext, useCreateBookingModal } from '@context'
import BookingCard from './components/BookingCard'
import { apiGetBookings } from '../../../services/bookings'

function Home() {
  const { user } = useUserContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [metadata, setMetadata] = useState({})
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState({})

  const { refetchTrigger } = useCreateBookingModal()

  const getBookings = async (page) => {
    setIsLoading(true)
    try {
      const perPage = 7
      const response = await apiGetBookings({ page, perPage, withCanceled: false })

      if (page === 1) {
        setBookings(response.data.bookings)
      } else {
        setBookings((prev) => [...prev, ...response.data.bookings])
      }
      setMetadata(response.data.meta)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getBookings(1)
  }, [refetchTrigger])

  const handleLoadMore = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1)
    }
  }

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)
  }

  const renderBooking = ({ item }) => (
    <BookingCard booking={item} onPress={() => handleViewBooking(item)} />
  )

  const closeBookingModal = () => {
    setBookingModalVisible(false)
  }

  return (
    <>
      <View style={styles.topContainer}>
        <BookingModal
          visible={bookingModalVisible}
          onClose={closeBookingModal}
          onCancelBooking={() => {
            setBookings([])
            getBookings()
          }}
          booking={selectedBooking}
        />
        <View style={styles.topRow}>
          <RoundCard
            text="Créditos"
            value={user.credits}
            icon={<FontAwesome5 name="coins" size={24} color="black" style={styles.icon} />}
          />
          <RoundCard
            text="Reservas atuais"
            value={user.active_bookings_count}
            icon={<Ionicons name="calendar-number-outline" size={24} style={styles.icon} />}
          />
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
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Card style={styles.emptyCardContent}>
              <Text style={styles.emptyCardText}>Você não possui nenhuma reserva</Text>
            </Card>
          )}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCardContent: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 200,
  },
  emptyCardText: {
    textAlign: 'center',
    fontWeight: 'semibold',
  },
  topContainer: {
    backgroundColor: '#479BA7',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
    color: '#333',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nextBookingsCol: {
    flexDirection: 'column',
    marginTop: '16px',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  textRow: {
    marginTop: 20,
  },
})

export default Home
