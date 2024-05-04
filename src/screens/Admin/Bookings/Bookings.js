import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { Loader, Card, Text, Button } from '@components'
import { apiGetAllUsersBookings } from '../../../services/bookings'
import FilterButton from '../../../components/FilterButton/FilterButton'
import FilterBookingsModal from './components/FilterBookingsModal'
import BookingModal from './components/BookingModal'
import BookingStatusBadge from '../../../components/BookingStatusBadge/BookingStatusBadge'
// import BookingModal from './components/BookingModal'

function Bookings() {
  const [filterBookingsModalVisible, setFilterBookingsModalVisible] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [metadata, setMetadata] = useState({})

  const [selectedBooking, setSelectedBooking] = useState({})

  const getBookings = async (page=1,  filters = {} ) => {
    setIsLoading(true)

    const perPage = 17
    const params = { page, perPage, ...filters };

    try {
      const response = await apiGetAllUsersBookings(params)

      if (page === 1) {
        setBookings(response.data.bookings)
      } else {
        setBookings((prev) => [...prev, ...response.data.bookings])
      }
      setMetadata(response.data.meta)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1)
    }
  }

  const handleOpenBookingModal = (booking) => {
    setSelectedBooking(booking)
    setBookingModalVisible(true)
  }

  useEffect(() => {
    getBookings(1)
  }, [])

  return (
      <SafeAreaView style={styles.container}>
        <Loader loading={isLoading} />
        <BookingModal
          visible={bookingModalVisible}
          booking={selectedBooking}
          onClose={() => setBookingModalVisible(false)}
          onConfirm={() => getBookings(1)}
        />
        <FilterBookingsModal
          visible={filterBookingsModalVisible}
          onClose={() => setFilterBookingsModalVisible(false)}
          onFilter={getBookings}
        />
        <FilterButton
          style={styles.filterButtonPosition}
          onPress={() => setFilterBookingsModalVisible(true)}
        />
        <Card style={styles.cardList}>
          <FlatList
            data={bookings}
            onEndReached={handleLoadMore}
            ListEmptyComponent={<Text>Não há reservas correspondendo a esses filtros</Text>}
            renderItem={({ item }) => (
              <Row
                item={item}
                handleOpenBookingModal={handleOpenBookingModal}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </SafeAreaView>
  )

  function Row({ item, handleOpenBookingModal }) {
    return (
      <View style={styles.listItem}>
        <View style={styles.bookingNameStatus}>
          <Text>{item.name}</Text>
          <BookingStatusBadge bookingStatus={item.status} />
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.rowContent} onPress={() => handleOpenBookingModal(item)}>
            <Feather name="edit" size={20} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  filterButtonPosition: {
    alignSelf: 'flex-end'
  },
  cardList: {
    flexDirection: 'column'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  pressableText: {
    color: '#0000EE',
  },
  bookingNameStatus: {
    flexDirection: 'row',
    gap: 4
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  addUserButton: {
    marginTop: 20
  },
  icon: {
    marginLeft: 12,
  },
})

export default Bookings
