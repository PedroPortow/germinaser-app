import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Divider } from '@ui-kitten/components'
import StatusBadge from '../StatusBadge/StatusBadge'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '../../helpers'
import ConfirmableModal from '../ConfirmableModal/ConfirmableModal'
import { apiDeleteBooking } from '../../services/bookings'

function BookingModal({ booking, visible, onClose, onCancelBooking }) {
  const handleDeleteBooking = async () => {
    try {
      console.log({ booking })
      console.log(booking.id)
      await apiDeleteBooking(booking.id)

      onCancelBooking()
      onClose()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <ConfirmableModal
      visible={visible}
      onClose={onClose}
      onCancel={handleDeleteBooking}
      close={onClose}
      cancelButtonLabel="Cancelar Reserva"
      cancelButtonAppearence="outline"
    >
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{booking.name}</Text>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Ionicons name="home-outline" size={20} color="black" />
            <Text style={styles.text}>
              {booking.clinic_name}, {booking.room_name}
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={20} color="black" />
            <Text style={styles.text}>
              {formatDate(booking.date)}, {getWeekDay(booking.date)}
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text style={styles.text}>
              {booking.start_time} - {getBookingEndtimeFormatted(booking.start_time)}
            </Text>
          </View>
          <Divider />
          {/* <View style={styles.badgeWrapper}>
            <StatusBadge status="info">{booking.status || 'Reservado'}</StatusBadge>
          </View> */}
        </View>
      </View>
    </ConfirmableModal>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardContent: {
    flexDirection: 'column',
    gap: 24,
    marginTop: 18,
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
})

export default BookingModal
