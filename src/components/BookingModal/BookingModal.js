import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '@components'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { Modal, Text, useToast } from 'native-base'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '../../helpers'
import { apiCancelBooking } from '../../services/bookings'
import { BOOKING_STATUS } from '../../constants/constants'
import BookingStatusBadge from '../BookingStatusBadge/BookingStatusBadge'
import ConfirmationModal from '../ConfirmationModal'
import { useUserContext } from '../../context/UserContext'
import CustomAlert from '../CustomAlert'

function BookingModal({ booking, visible, onClose, onCancelBooking }) {
  const [confirmationModalVisible, setConfirmationModalVisibile] = useState(false)

 const { getUserData } = useUserContext()

 const toast = useToast();

  const handleCancelBooking = async () => {
    try {
      await apiCancelBooking(booking.id)

      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Reserva cancelada com sucesso!" status='success'/>
      })

      onCancelBooking()
      onClose()
      getUserData()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const isSameDay = useMemo(() => {
    const today = moment();
    const bookingDate = moment(booking.date);

    return bookingDate.isSame(today, 'day');
  }, [booking.date]);

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
        title='🚨 Atenção'
        onCancel={() => setConfirmationModalVisibile(false)}
        onClose={() => setConfirmationModalVisibile(false)}
      >
        <View style={styles.confirmationModalContent}>
          <Text style={styles.text}>Esta ação é definitiva! </Text>
         <Text style={styles.text}> 
          {isSameDay 
            ? 'O crédito utilizado para esta reserva só será ressarcido caso alguém reserve este horário'
            : 'O crédito utilizado para esta reserva será ressarcido'
          }
        </Text>
        </View>
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
    flexDirection: 'column',
    gap: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  confirmationModalContent: {
    flexDirection: 'column',
    gap: 4
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
  },
})

export default BookingModal
