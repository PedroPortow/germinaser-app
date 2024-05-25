import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import BookingCard from '../../screens/Main/Home/components/BookingCard'
import { Card } from '../Cards'

function BookingsList({ bookings, handleNextPage, handleSelectBooking, isLoading }) {
  const renderBooking = ({ item }) => (
    <BookingCard booking={item} onPress={() => handleSelectBooking(item)} />
  )



  return (
    <FlatList
      data={bookings}
      renderItem={renderBooking}
      keyExtractor={(booking) => String(booking.id)}
      onEndReached={handleNextPage}
      ListEmptyComponent={ !isLoading &&
        <Card style={styles.emptyCardContent}>
          <Text style={styles.emptyCardText}>Você não possui nenhuma reserva</Text>
        </Card>
      }
      onEndReachedThreshold={0.05}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 200,
  },
  emptyCardContent: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  emptyCardText: {
    textAlign: 'center',
    fontWeight: 'semibold',
  },
})

export default BookingsList
