import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Loader, Text } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Modal, Input, Divider, Button } from 'native-base'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '@helpers'
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from '../../../../constants/constants'
import { apiCancelBookingAsAdmin, apiUpdateBookingAsAdmin } from '../../../../services/bookings'
import ConfirmationModal from '../../../../components/ConfirmationModal'
import BookingStatusBadge from '../../../../components/BookingStatusBadge/BookingStatusBadge'

function BookingModal({ booking, visible, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [bookingName, setBookingName] = useState()
  const [confirmationModalVisible, setConfirmationModalVisibile] = useState(false)

  useEffect(() => {
    if (visible) {
      setSelecteBookingInfo()
    }
  }, [visible])

  const setSelecteBookingInfo = () => {
    setBookingName(booking.name)
  }

  const handleEditBooking = async () => {
    setIsLoading(true)

    try {
      const params = {
        bookingName,
      }

      await apiUpdateBookingAsAdmin(booking.id, params)
      onClose()
      onConfirm()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    try {
      await apiCancelBookingAsAdmin(booking.id)

      onConfirm()
    } catch (error) {
      console.error(error)
    } finally {
      onClose()
      setIsLoading(false)
    }
  }

  if (!visible) {
    return null
  }

  return (
    <>
      <ConfirmationModal
        visible={confirmationModalVisible}
        onConfirm={() => {
          setConfirmationModalVisibile(false)
          handleCancelBooking()
          onClose()
        }}
        title="🚨Atenção"
        onCancel={() => setConfirmationModalVisibile(false)}
        onClose={() => setConfirmationModalVisibile(false)}
      >
        <Text>
          Esta ação é definitiva, ao cancelar a reserva de um usuário o horário reservado será
          liberado para outros horários
        </Text>
      </ConfirmationModal>
      <Modal isOpen={visible} onClose={onClose} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header style={styles.headerRow}>Detalhes da reserva</Modal.Header>
          <Modal.Body>
            <View style={styles.content}>
              {booking.status === BOOKING_STATUS.scheduled && (
                <>
                  <View style={styles.inputLabelWrapper}>
                    <Text style={styles.label}>Nome da Reserva</Text>
                    <Input
                      value={bookingName}
                      size="lg"
                      onChangeText={(value) => setBookingName(value)}
                    />
                  </View>
                  <Button colorScheme="red" onPress={() => setConfirmationModalVisibile(true)}>
                    Cancelar Reserva
                  </Button>
                  <Divider marginY={2} />
                </>
              )}
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
              <View style={styles.row}>
                <BookingStatusBadge bookingStatus={booking.status} />
              </View>
            </View>
          </Modal.Body>
          {booking.status === BOOKING_STATUS.scheduled && (
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                  Cancelar
                </Button>
                <Button onPress={handleEditBooking}>Salvar</Button>
              </Button.Group>
            </Modal.Footer>
          )}
        </Modal.Content>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {},
})

export default BookingModal
