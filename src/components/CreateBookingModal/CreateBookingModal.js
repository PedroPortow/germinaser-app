import React, { useEffect, useMemo, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Loader } from '@components'
import { Input, Text, useToast } from 'native-base'
import ChooseDateModal from './components/ChooseDateModal'
import { formatDate } from '../../helpers/date'
import { apiCreateBooking } from '../../services/bookings'
import ClinicSelect from '../ClinicSelect'
import RoomSelect from '../RoomSelect'
import Button from '../Button'
import CustomAlert from '../CustomAlert'

function CreateBookingModal({ visible, onClose, onCreate }) {
  const [clinic, setClinic] = useState()
  const [room, setRoom] = useState()
  const [name, setName] = useState()

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const [selectedDay, setSelectedDay] = useState('20')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const dateButtonActive = useMemo(() => (name || clinic || room), [name, clinic, room])
  const submitButtonActive = useMemo(() => (name || clinic || room || selectedTimeSlot || selectedDay), [name, clinic, room, selectedTimeSlot, selectedDay])

  const toast = useToast();

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

  const handleCreateBooking = async () => {
    setIsLoading(true)
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`
      await apiCreateBooking({
        name,
        start_time: startTime,
        room_id: room,
      })

      onClose()
      onCreate()
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Reserva realizada com sucesso!" status='success'/>
      })
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text="Erro na criação da reserva, revise os campos preenchidos" status='error'/>
      })
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
            placeholder="Nome para identificar a reserva"
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
            style={dateButtonActive ? styles.activePressable : styles.disabledPressable }
            onPress={() => setDateModalVisible(true)}
            disabled={!room}
          >
            {selectedTimeSlot ? (
              <Text style={styles.selectedTimeText}>
                {formatDate(selectedDay)} - {selectedTimeSlot}
              </Text>
            ) : (
              <Text style={dateButtonActive ? styles.placeholderActive : styles.placeholderInactive}>Selecione a data</Text>
            )}
          </Pressable>
        </View>
        <Button
          style={styles.bottomButtonPosition}
          onPress={handleCreateBooking}
          disabled={!submitButtonActive}
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
    bottom: -320,
    left: 0,
  },
  content: {
    flexDirection: 'column',
    gap: 26,
    padding: 10,
  },
  selectedTimeText: {
    color: '#222B45',
    fontWeight: 400,
    fontSize: 15,
  },
  placeholderActive: {
    color: 'text.400',
    fontWeight: 400,
    fontSize: 16,
  },
  placeholderInactive: {
    color: '#ccc',
    fontWeight: 400,
    fontSize: 16,
  },
  disabledPressable: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F7F9FC',
  },
  activePressable: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFFF',
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
})

export default CreateBookingModal
