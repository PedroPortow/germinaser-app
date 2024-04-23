import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Input, Button } from '@ui-kitten/components'
import { ConfirmableModal, Loader, Text } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { formatDate, getBookingEndtimeFormatted, getWeekDay } from '@helpers'
import { BOOKING_STATUS, BOOKING_STATUS_LABEL } from '../../../../constants/constants'
import { apiCancelBookingAsAdmin, apiUpdateBookingAsAdmin } from '../../../../services/bookings'

function BookingModal({ booking, visible, close, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    if (visible) {
      setSelecteBookingInfo()
    }
  }, [visible])

  const setSelecteBookingInfo = () => {
    setName(booking.name)
    setAddress(booking.address)
  }

  const handleEditBooking = async () => {
    setIsLoading(true)

    try {
      const params = {
        name,
        address,
      }

      await apiUpdateBookingAsAdmin(booking.id, params)
      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    try {
      await apiCancelBookingAsAdmin(booking.id)

      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasEdits = useMemo(
    () => name !== booking.name || booking.address !== address,
    [name, address]
  )

  console.log({ booking })

  return (
    <>
      <Loader loading={isLoading} />
      <ConfirmableModal
        visible={visible}
        backdropStyle={styles.backdrop}
        close={close}
        confirmButtonLabel={
          booking.status === BOOKING_STATUS.upcoming ? 'Salvar alterações' : 'Concluir'
        }
        confirmButtonDisabled={booking.status === BOOKING_STATUS.upcoming ? !hasEdits : false}
        onConfirm={booking.status === BOOKING_STATUS.upcoming ? handleEditBooking : () => close()}
        onCancel={close}
      >
        <View style={styles.cardContainer}>
          {booking.status === BOOKING_STATUS.upcoming && (
            <>
              <Input
                placeholder="Clínica 3"
                value={name}
                label="Nome da Reserva"
                onChangeText={(value) => setName(value)}
              />
              <Button onPress={handleCancelBooking} status="danger" size="medium">
                Cancelar Reserva
              </Button>
              <Divider />
            </>
          )}
          <View style={styles.bookingInfo}>
            {booking.status !== BOOKING_STATUS.upcoming && (
              <Text style={styles.bookingName}>{booking.name}</Text>
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
              {/* TODO: Fix this bullshit ass status label */}
              <Text style={styles.text}>Status: {BOOKING_STATUS_LABEL[booking.status]}</Text>
            </View>
          </View>
        </View>
      </ConfirmableModal>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  bookingInfo: {
    flexDirection: 'column',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  bookingName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default BookingModal
