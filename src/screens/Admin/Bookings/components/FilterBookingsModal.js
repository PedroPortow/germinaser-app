import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Modal, Button, Select } from 'native-base'
import { Loader } from '@components'
import { apiGetAllUsers } from '../../../../services/user'
import ClinicSelect from '../../../../components/ClinicSelect'

function FilterBookingsModal({ visible, onClose, onFilter }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedClinic, setSelectedClinic] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [userOptions, setUserOptions] = useState([])

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetAllUsers()

      console.log(response.data)

      const formattedResponse = response.data.map((user) => ({
        label: user.name,
        value: user.id,
      }))

      setUserOptions(formattedResponse)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectUser = (user) => {
   setSelectedUser(user)
  }

  useEffect(() => {
    if (visible) {
      getUsers()
    }
  }, [visible])

  if (!visible) {
    return null
  }

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
                onValueChange={handleSelectUser}
                size="lg"
              >
                {userOptions.map((user) => (
                  <Select.Item key={user.value} label={user.label} />
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
                onFilter(1, selectedUser, selectedClinic)
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
