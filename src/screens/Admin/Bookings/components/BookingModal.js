import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from '@ui-kitten/components'
import { ConfirmableModal, Loader } from '@components'
import { useFormFilled } from '@hooks'
import { apiUpdateBooking } from '../../../../services/bookings'

function BookingModal({ booking, visible, close, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState()
  const [address, setAddress] = useState()

  const creatingClinic = useMemo(() => !Object.keys(booking).length, [booking])

  const isFormFilled = useFormFilled({ name, address })

  useEffect(() => {
    if (visible) {
      setSelecteClinicInfo()
    }
  }, [visible])

  const setSelecteClinicInfo = () => {
    setName(booking.name)
    setAddress(booking.address)
  }

  const handleCreateClinic = async () => {
    try {
      const params = {
        name,
        address,
      }

      await apiCreateClinic(params)
      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleEditClinic = async () => {
    try {
      const params = {
        name,
        address,
      }

      await apiUpdateBooking(booking.id, params)
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

  return (
    <>
      <Loader loading={isLoading} />
      <ConfirmableModal
        visible={visible}
        backdropStyle={styles.backdrop}
        close={close}
        cancelButtonLabel="Cancelar"
        confirmButtonLabel={creatingClinic ? 'Adicionar Clínica' : 'Salvar alterações'}
        confirmButtonDisabled={creatingClinic ? !isFormFilled : !hasEdits}
        onConfirm={creatingClinic ? handleCreateClinic : handleEditClinic}
        onCancel={close}
      >
        <View style={styles.cardContainer}>
          <Input
            placeholder="Clínica 3"
            value={name}
            label="Nome da Clínica"
            onChangeText={(value) => setName(value)}
          />
          <Input
            placeholder="Rua Dom Pedro II, 238"
            value={address}
            label="Endereço"
            onChangeText={(value) => setAddress(value)}
          />
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

export default BookingModal
