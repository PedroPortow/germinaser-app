import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { apiGetBookings } from '../../../services/bookings'
import BookingsList from '../../../components/BookingsList/BookingsList'
import { Text, FilterButton, BookingFilterModal } from '@components'

function UserBookings() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState({})

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [metadata, setMetadata] = useState({})

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)
  }

  const getBookings = async (page=1, filters = {} ) => {
    setIsLoading(true)
    const perPage = 17
    const params = { page, perPage, ...filters };

    console.log({params})

    try {
      const response = await apiGetBookings(params)

      if (page === 1) {
        setBookings(response.data.bookings)
      } else {
        setBookings((prev) => [...prev, ...response.data.bookings])
      }
      setMetadata(response.data.meta)
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextPage = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1)
    }
  }
  useEffect(() => {
    getBookings()
  }, [])

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true)
  }

  return (
    <>
      {/* <BookingFilterModal
        onClose={() => setFilterModalVisible(false)}
        visible={filterModalVisible}
        onConfirm={handleFilterBooking}
      /> */}
      {/* <BookingFilterModal /> */}
      <BookingFilterModal
        onClose={() => setFilterModalVisible(false)}
        visible={filterModalVisible}
        onConfirm={getBookings}
      />
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Reservas</Text>
        <FilterButton onPress={() => handleOpenFilterModal()} style={styles.customButton} />
      </View>
      <View style={styles.bottomContainer}>
        <BookingsList
          bookings={bookings}
          handleNextPage={handleNextPage}
          handleSelectBooking={handleSelectBooking}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginTop: 'auto',
  },
  topContainer: {
    backgroundColor: '#479BA7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // customButton: {
  //   backgroundColor: 'white'
  // },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default UserBookings
