import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ConfirmableModal, Loader } from '@components'
import { useFormFilled } from '@hooks'
import { apiGetClinics } from '../../../../services/clinics'
import { apiCreateRoom, apiUpdateRoom } from '../../../../services/rooms'

function RoomModal({ room, visible, close, onSubmit }) {
  // todo: arrumar o loader n ta pegando nessas modals
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState()
  const [clinicId, setClinicId] = useState()

  // kitten-ui
  const [selectedClinicIndex, setSelectedClinicIndex] = useState()
  const [clinicOptions, setClinicOptions] = useState([])

  const creatingRoom = useMemo(() => !Object.keys(room).length, [room])

  const isFormFilled = useFormFilled({ name, clinicId })

  console.log({ clinicId })

  useEffect(() => {
    if (visible) {
      setSelecteRoomInfo()
    } else {
      clearFields()
    }
  }, [visible])

  const clearFields = () => {
    setName('')
    setClinicId('')
    setSelectedClinicIndex()
    setClinicOptions([])
  }

  useEffect(() => {
    if (visible && creatingRoom) {
      getClinicOptions()
    }
  }, [visible, creatingRoom])

  const onChangeClinic = (index) => {
    setSelectedClinicIndex(index)
    const roleValue = clinicOptions[index.row].value
    setClinicId(roleValue)
  }

  const setSelecteRoomInfo = () => {
    setName(room.name)
    setClinicId(room.clinic_id)
  }

  const handleCreateRoom = async () => {
    try {
      const params = {
        name,
        clinic_id: clinicId,
      }

      await apiCreateRoom(params)
      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleEditRoom = async () => {
    try {
      const params = {
        name,
      }

      await apiUpdateRoom(room.id, params)
      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getClinicOptions = async () => {
    try {
      const response = await apiGetClinics()

      const formattedResponse = response.data.map((clinic) => ({
        label: clinic.name,
        value: clinic.id,
      }))

      setClinicOptions(formattedResponse)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasEdits = useMemo(
    () => name !== room.name || clinicId !== room.clinic_id,
    [name, clinicId]
  )

  return (
    <>
      <Loader loading={isLoading} />
      <ConfirmableModal
        visible={visible}
        backdropStyle={styles.backdrop}
        close={close}
        cancelButtonLabel="Excluir Sala"
        confirmButtonLabel={creatingRoom ? 'Adicionar Sala' : 'Salvar alterações'}
        confirmButtonDisabled={creatingRoom ? !isFormFilled : !hasEdits}
        onConfirm={creatingRoom ? handleCreateRoom : handleEditRoom}
        onCancel={close}
      >
        <View style={styles.cardContainer}>
          <Input
            placeholder="Sala 3"
            value={name}
            label="Nome da Sala"
            onChangeText={(value) => setName(value)}
          />

          {creatingRoom && (
            <Select
              selectedIndex={selectedClinicIndex}
              onSelect={onChangeClinic}
              label="Clínica"
              value={clinicOptions[selectedClinicIndex?.row]?.label || 'Selecione uma opção'}
              placeholder="Clínica 1"
            >
              {clinicOptions.map((role) => (
                <SelectItem key={role.value} title={role.label} />
              ))}
            </Select>
          )}
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default RoomModal
