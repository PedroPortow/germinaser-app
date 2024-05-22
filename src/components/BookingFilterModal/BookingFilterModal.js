import React, { useEffect, useState } from 'react'
import { Loader, ClinicSelect, } from '@components'
import { StyleSheet, View, } from 'react-native'
import { Modal, Button, Select, Text } from 'native-base'
import RoomSelect from '../RoomSelect'
import { BOOKING_STATUS_LABEL } from '../../constants/constants'
import { Ionicons } from '@expo/vector-icons'

function BookingFilterModal({ onClose, onConfirm, visible }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState('all')

  const [selectedRoom, setSelectedRoom] = useState('all')

  const [selectedStatus, setSelectedStatus] = useState('all')

  const STATUS_OPTIONS = [
    { value: 'all', label: "Todas" },
    { value: 'canceled', label: BOOKING_STATUS_LABEL.canceled},
    { value: 'scheduled', label: BOOKING_STATUS_LABEL.scheduled},
    { value: 'completed', label: BOOKING_STATUS_LABEL.completed},
  ]


  return (
    <Modal isOpen={visible} onClose={onClose} size="lg">
    <Loader loading={isLoading} />
    <Modal.Content>
      <Modal.Header>Filtrar Reservas</Modal.Header>
      <Modal.CloseButton onPress={onClose} />
      <Modal.Body>
        <View style={styles.content}>
        <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Status da reserva</Text>
            <Select
              size='lg'
              accessibilityLabel="Selecione um status"
              placeholder="Selecione um status"
              selectedValue={selectedStatus}
              dropdownIcon={
                <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  color="#333"
                  style={{marginRight: 8}}
                />
              }
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              {STATUS_OPTIONS.map((status) => (
                  <Select.Item key={status.value} label={status.label} value={status.value} />
                ))}
            </Select>
          </View>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Clínica</Text>
            <ClinicSelect
              onSelectClinic={(clinic) => setSelectedClinic(clinic)}
              selectedClinic={selectedClinic}
            />
          </View>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Sala</Text>
            <RoomSelect
              selectedClinic={selectedClinic}
              selectedRoom={selectedRoom}
              onSelectRoom={room => setSelectedRoom(room)}
            />
          </View>
        </View>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            onPress={() => {
              onClose()
              onConfirm(1, {
                status: selectedStatus,
                room_id: selectedRoom,
                clinic_id: selectedClinic })
            }}
          >
            Filtrar
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    gap: 16
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
})

export default BookingFilterModal
