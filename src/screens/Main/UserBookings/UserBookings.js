import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { apiGetBookings } from '../../../services/bookings'
import BookingsList from '../../../components/BookingsList/BookingsList'
import { Text, Button, FilterButton } from '@components'
import BookingFilterModal from '../../../components/BookingFilterModal/BookingFilterModal'

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
    getBookings(1)
  }, [])

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true)
  }

  const handleFilterBooking = () => {
    console.log("raseaeas")
  }

  return (
    <SafeAreaView style={styles.container}>
      <BookingFilterModal 
        onClose={() => setFilterModalVisible(false)}
        visible={filterModalVisible} 
        onConfirm={handleFilterBooking}
      />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Reservas</Text>
          <FilterButton onPress={() => handleOpenFilterModal()} />
        </View>
        <BookingsList
          bookings={bookings}
          handleNextPage={handleNextPage}
          handleSelectBooking={handleSelectBooking}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default UserBookings
