// Componente pra mostrar/cancelar (futuramente editar?) bookings
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, Button, Card, Text } from '@components'
import { Ionicons, Feather } from '@expo/vector-icons'
import { Divider } from '@ui-kitten/components'
import StatusBadge from '../StatusBadge/StatusBadge'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '../../helpers'

function BookingModal({ booking, visible, onClose }) {
  const oi = 2

  const handleDeleteBooking = async () => {
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`
      const response = await apiCreateBooking({
        start_time: startTime,
        room_id: room,
      })

      onClose()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      confirmLabel="Excluir reserva"
      theme="destructiveOutline"
      buttonLabel="Cancelar reserva"
      title="Dados da Reserva"
      closeIcon="chevron-back-outline"
      onConfirm={handleDeleteBooking}
    >
      <View style={styles.content}>
        <Card style={styles.cardContent}>
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
          <View style={styles.badgeWrapper}>
            <StatusBadge status="active" />
          </View>
        </Card>
      </View>
    </Modal>
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
    paddingTop: 10,
    paddingLeft: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  cardContent: {
    flexDirection: 'column',
    gap: 24,
    paddingLeft: 16,
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  badgeWrapper: {
    maxWidth: 120,
  },
})

export default BookingModal
