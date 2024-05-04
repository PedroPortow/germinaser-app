import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Modal, Button, Select } from 'native-base'
import { Loader } from '@components'
import { apiGetAllUsers } from '../../../../services/user'
import ClinicSelect from '../../../../components/ClinicSelect'
import { Ionicons } from '@expo/vector-icons'
import { BOOKING_STATUS_LABEL } from '../../../../constants/constants'
import RoomSelect from '../../../../components/RoomSelect'

function FilterBookingsModal({ visible, onClose, onFilter }) {
  const [selectedUser, setSelectedUser] = useState('all')
  const [selectedClinic, setSelectedClinic] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState('all')

  const [isLoading, setIsLoading] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState('all')

  const [userOptions, setUserOptions] = useState([])

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetAllUsers()

      const allUsersOptions = { label: 'Todos', value: 'all' };
      const formattedResponse = response.data.map((user) => ({
        label: user.name,
        value: user.id,
      }))

      setUserOptions([allUsersOptions, ...formattedResponse])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    if (visible) {
      getUsers()
    }
  }, [visible])

  if (!visible) {
    return null
  }

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
              <Text style={styles.label}>Usuário</Text>
              <Select
                selectedValue={selectedUser}
                placeholder="Selecione um usuário"
                onValueChange={(itemValue) => setSelectedUser(itemValue)}
                size="lg"
              >
                {userOptions.map((user) => (
                  <Select.Item key={user.value} label={user.label} value={user.value} />
                ))}
              </Select>
            </View>
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
                onFilter(1, {
                  status: selectedStatus,
                  room_id: selectedRoom,
                  clinic_id: selectedClinic,
                  user_id: selectedUser
                })
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
    gap: 16,
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
})

export default FilterBookingsModal
