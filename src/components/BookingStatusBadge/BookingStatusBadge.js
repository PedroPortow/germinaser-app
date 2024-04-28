import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Badge, Modal } from 'native-base'
import { BOOKING_STATUS_LABEL } from '../../constants/constants'

function BookingStatusBadge({ bookingStatus }) {
  const colorSchemesMapping = {
    Agendada: '',
    Cancelada: 'error',
    past: 'success'
  }
  
  return (
    <Badge variant={'subtle'} colorScheme={colorSchemesMapping[bookingStatus]}>
      {BOOKING_STATUS_LABEL[bookingStatus]}
    </Badge>
  )
}

const styles = StyleSheet.create({
 
})

export default BookingStatusBadge
