import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '../../helpers'
import { apiCancelBooking } from '../../services/bookings'
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from '../../constants/constants'
import { Badge, Modal } from 'native-base'
import BookingStatusBadge from '../BookingStatusBadge/BookingStatusBadge'
import ConfirmationModal from '../ConfirmationModal'

function BookingModal({ booking, visible, onClose, onCancelBooking }) {
  const [confirmationModalVisible, setConfirmationModalVisibile] = useState(false)

  const handleCancelBooking = async () => {
    try {
      await apiCancelBooking(booking.id)

      onCancelBooking()
      onClose()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <>
      <ConfirmationModal
        visible={confirmationModalVisible}
        onConfirm={() => {
          handleCancelBooking()
          setConfirmationModalVisibile(false)
          onClose()
          onCancelBooking()
        }}
        title={'🚨Atenção'}
        onCancel={() => setConfirmationModalVisibile(false)}
        onClose={() => setConfirmationModalVisibile(false)}
      >
        <Text>Esta ação é definitiva, ao cancelar uma reserva o horário da mesma podera ser reservado por outros usuários</Text>
      </ConfirmationModal>
      <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={styles.headerRow}>
          {booking.name}
          <BookingStatusBadge bookingStatus={booking.status} />
        </Modal.Header>
        <Modal.Body>
          <View style={styles.content}>
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
          </View>
        </Modal.Body>
        {booking.status === BOOKING_STATUS.scheduled && (
          <Modal.Footer>
            <Button style={styles.footerButton} onPress={() => setConfirmationModalVisibile(true)}>Cancelar Reserva</Button>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerButton: {
    width: '100%',
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    flexDirection: 'column',
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
})

export default BookingModal
