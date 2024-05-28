import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Loader, Text } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Modal, Input, Divider, Button, useToast } from 'native-base'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '@helpers'
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from '../../../../constants/constants'
import { apiCancelBookingAsAdmin, apiUpdateBookingAsAdmin } from '../../../../services/bookings'
import ConfirmationModal from '../../../../components/ConfirmationModal'
import BookingStatusBadge from '../../../../components/BookingStatusBadge/BookingStatusBadge'
import CustomAlert from '../../../../components/CustomAlert'

function BookingModal({ booking, visible, onClose, onConfirm }) {
  const [bookingName, setBookingName] = useState()
  const [confirmationModalVisible, setConfirmationModalVisibile] = useState(false)

  const toast = useToast();

  useEffect(() => {
    if (visible) {
      setSelecteBookingInfo()
    }
  }, [visible])

  const setSelecteBookingInfo = () => {
    setBookingName(booking.name)
  }

  const handleEditBooking = async () => {
    try {
      const params = {
        name: bookingName,
      }

      await apiUpdateBookingAsAdmin(booking.id, params)
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Informações editadas com sucesso" status='success'/>
      })
      onClose()
      onConfirm()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Erro ao editar informações" status='error'/>
      })
      console.error(error)
    } 
  }

  const handleCancelBooking = async () => {
    try {
      await apiCancelBookingAsAdmin(booking.id)

      onConfirm()
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Reserva cancelada com sucesso!" status='success'/>
      })
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Erro ao cancelar reserva" status='success'/>
      })
      console.error(error)
    } finally {
      onClose()
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
        <Text style={styles.confirmationText}>
          Ao cancelar a reserva de um usuário o horário previamente reservado será
          liberado para reserva novamente
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
  label: {

  },
  confirmationText: {
    fontSize: 16,
    fontWeight: 400,
  },
})

export default BookingModal
