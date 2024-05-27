import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Loader, RoundCard, BookingModal } from '@components'
import { useUserContext } from '@context'
import { Text } from 'native-base'
import { apiGetBookings } from '../../../services/bookings'
import BookingsList from '../../../components/BookingsList/BookingsList'
import { BOOKING_STATUS } from '../../../constants/constants'

function Home({ refetch }) {
  const { user, getUserData } = useUserContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [metadata, setMetadata] = useState({})
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState({})

  const getBookings = async (page = 1) => {
    setIsLoading(true)
    try {
      const perPage = 7
      const response = await apiGetBookings({ page, perPage, status: BOOKING_STATUS.scheduled })

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
    getBookings()
    getUserData()
  }, [refetch])

  const handleNextPage = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1)
    }
  }

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)
  }

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
            text="Reservas"
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
          <BookingsList
            bookings={bookings}
            isLoading={isLoading}
            handleNextPage={handleNextPage}
            handleSelectBooking={handleSelectBooking}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1, 
    marginHorizontal: 20,
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
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 4,
  },
  textRow: {
    marginTop: 20,
  },
})

export default Home
