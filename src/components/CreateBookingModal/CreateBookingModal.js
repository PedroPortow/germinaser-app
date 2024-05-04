import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text, Loader } from '@components'
import { Input } from 'native-base'
import ChooseDateModal from './components/ChooseDateModal'
import { formatDate } from '../../helpers/date'
import { apiCreateBooking } from '../../services/bookings'
import { useToast } from '../../context/ToastContext'
import ClinicSelect from '../ClinicSelect'
import RoomSelect from '../RoomSelect'
import Button from '../Button'

function CreateBookingModal({ visible, onClose, onCreate }) {
  const [clinic, setClinic] = useState()
  const [room, setRoom] = useState()
  const [name, setName] = useState()

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const [selectedDay, setSelectedDay] = useState('20')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const resetStates = () => {
    setRoom(null)
    setClinic(null)
    setSelectedDay(null)
    setSelectedTimeSlot(null)
  }

  useEffect(() => {
    if (!visible) {
      resetStates()
    }
  }, [visible])

  const onChooseDate = (day, timeslot) => {
    setSelectedDay(day)
    setSelectedTimeSlot(timeslot)
    setDateModalVisible(false)
  }

  console.log({onCreate})

  const handleCreateBooking = async () => {
    setIsLoading(true)
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`
      await apiCreateBooking({
        name,
        start_time: startTime,
        room_id: room,
      })

      // TODO: Trigger refetch...
      onClose()
      onCreate()
      // showToast({
      //   message: 'Reserva criada com sucesso!',
      //   theme: 'success',
      // })
    } catch (error) {
      // showToast({
      //   message: 'Erro na criação da reserva, revise os campos preenchidos',
      //   theme: 'error',
      // })
      console.log(error)
      // console.error(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Loader loading={isLoading} />
      <ChooseDateModal
        selectedRoom={room}
        onClose={() => setDateModalVisible(false)}
        visible={dateModalVisible}
        onConfirm={onChooseDate}
      />
      <View style={styles.content}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Nome da Reserva</Text>
          <Input
            value={name}
            size="lg"
            variant="outline"
            placeholder="Reserva João"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Clínica</Text>
          <ClinicSelect onSelectClinic={(clinic) => setClinic(clinic)} withAllOption={false} />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Sala</Text>
          <RoomSelect selectedClinic={clinic} onSelectRoom={(clinic) => setRoom(clinic)} withAllOption={false} />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Data</Text>
          <Pressable
            style={styles.pressableInput}
            onPress={() => setDateModalVisible(true)}
            disabled={!room}
          >
            {selectedTimeSlot ? (
              <Text style={styles.selectedTimeText}>
                {formatDate(selectedDay)} - {selectedTimeSlot}
              </Text>
            ) : (
              <Text style={styles.placeholder}>Selecione a data</Text>
            )}
          </Pressable>
        </View>
        <Button
          style={styles.bottomButtonPosition}
          onPress={handleCreateBooking}
          disabled={!name || !clinic || !room || !selectedDay || !selectedTimeSlot}
        >
          Confirmar reserva
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomButtonPosition: {
    position: 'relative',
    bottom: -260,
    left: 0,
  },
  content: {
    flexDirection: 'column',
    gap: 26,
    padding: 10,
  },
  selectedTimeText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 15,
  },
  placeholder: {
    color: '#C5CCD9',
    fontWeight: 'semibold',
    fontSize: 15,
  },
  pressableInput: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F7F9FC',
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
})

export default CreateBookingModal
