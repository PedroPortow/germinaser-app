import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { Loader, Card, Text } from '@components'
import { apiGetAllUsersBookings } from '../../../services/bookings'
import FilterButton from '../../../components/FilterButton/FilterButton'
import FilterBookingsModal from './components/FilterBookingsModal'
import BookingModal from './components/BookingModal'
import BookingStatusBadge from '../../../components/BookingStatusBadge/BookingStatusBadge'

const { height } = Dimensions.get('window');

function Bookings() {
  const [filterBookingsModalVisible, setFilterBookingsModalVisible] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [metadata, setMetadata] = useState({})

  const [selectedBooking, setSelectedBooking] = useState({})

  const [filters, setFilters] = useState({
    user: 'all',
    clinic: 'all',
    room: 'all',
    status: 'all'
  })

  const getBookings = async (page=1) => {
    setIsLoading(true)

    const perPage = 13
    const params = { page, per_page: perPage, room_id: filters.room, user_id: filters.user, clinic_id: filters.clinic, status: filters.status };

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


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
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
          filters={filters}
          onChange={handleFilterChange}
        />
        <FilterButton
          style={styles.filterButtonPosition}
          onPress={() => setFilterBookingsModalVisible(true)}
        />
        <Card style={styles.cardList}>
          <FlatList
            data={bookings}
            onEndReached={handleLoadMore}
            initialNumToRender={13}
            onEndReachedThreshold={0.1}
            contentContainerStyle={styles.listContainer}
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
  listContainer: {
    height: 'auto',
  },
  cardList: {
    flexDirection: 'column',
    maxHeight: height * 0.77,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
