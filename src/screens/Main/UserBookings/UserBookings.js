import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FilterButton, BookingFilterModal, Loader } from '@components'
import { Text } from 'native-base'
import { apiGetBookings } from '../../../services/bookings'
import BookingsList from '../../../components/BookingsList/BookingsList'
import BookingModal from '../../../components/BookingModal/BookingModal'

function UserBookings({ refetch }) {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState({})

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [metadata, setMetadata] = useState({})

  const [filters, setFilters] = useState({
    status: 'all',
    room: 'all',
    clinic: 'all'
  })

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)
  }

  const getBookings = async (page=1) => {
    setIsLoading(true)
    const perPage = 10
    const params = {
      page,
      per_page: perPage,
      status: filters.status,
      room_id: filters.room,
      clinic_id: filters.clinic
    };

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
  }, [refetch])

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Loader loading={isLoading} />
      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        onCancelBooking={() => {
          getBookings()
        }}
        booking={selectedBooking}
      />
      <BookingFilterModal
        filters={filters}
        onChange={handleFilterChange}
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
  topText: {
    fontWeight: 600,
    color: 'white',
    fontSize: 22,
    marginBottom: 4,
    marginTop: 'auto',
  },
  topContainer: {
    backgroundColor: '#479BA7',
    paddingHorizontal: 20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    paddingHorizontal: 20
    // marginHorizontal: 20,
  },
})

export default UserBookings
