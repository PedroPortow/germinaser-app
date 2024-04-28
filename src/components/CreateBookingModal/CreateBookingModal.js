import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Modal, Text, Loader } from '@components'
import ChooseDateModal from './components/ChooseDateModal'
import { apiGetClinicRooms, apiGetClinics } from '../../services/clinics'
import { formatDate } from '../../helpers/date'
import { apiCreateBooking } from '../../services/bookings'
import { useToast } from '../../context/ToastContext'
import { Input, Select } from 'native-base'
import FullScreenModal from '../FullScreenModal'
import ClinicSelect from '../ClinicSelect'
import RoomSelect from '../RoomSelect'

function CreateBookingModal({ visible, onClose, onCreate }) {
  const [clinic, setClinic] = useState()
  const [room, setRoom] = useState()
  const [name, setName] = useState()

  // ui-kitten
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null)
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(null)
  const [clinicOptions, setClinicOptions] = useState([])

  const [roomOptions, setRoomOptions] = useState([])

  const [dateModalVisible, setDateModalVisible] = useState(false)

  const [selectedDay, setSelectedDay] = useState('20')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { showToast } = useToast()

  useEffect(() => {
    getClinicOptions()
  }, [])

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

  const resetStates = () => {
    setRoom(null)
    setClinic(null)
    setSelectedDay(null)
    setSelectedTimeSlot(null)

    // ui-kitten
    setSelectedClinicIndex(null)
    setSelectedRoomIndex(null)
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


  const onChooseRoom = (selectedRoom) => {
    const selectedRoomId = roomOptions[selectedRoom.row].value
    setSelectedRoomIndex(selectedRoom)
    setRoom(selectedRoomId)
  }

  const handleCreateBooking = async () => {
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`
      await apiCreateBooking({
        name,
        start_time: startTime,
        room_id: room,
      })

      onCreate()
      onClose()
      showToast({
        message: 'Reserva criada com sucesso!',
        theme: 'success',
      })
    } catch (error) {
      showToast({
        message: 'Erro na criação da reserva, revise os campos preenchidos',
        theme: 'error',
      })
      console.error(error.response.data)
    }
  }

  return (
    <FullScreenModal
      visible={visible}
      onClose={onClose}
      title="Nova Reserva"
      confirmLabel="Reservar"
      theme="primary"
      buttonLabel="Reservar"
      onConfirm={handleCreateBooking}
      disableConfirm={!name || !clinic || !room || !selectedDay || !selectedTimeSlot}
    >
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
            size='lg'
            variant="outline"
            placeholder="Reserva João"
            onChangeText={(value) => setName(value)}rere
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Clínica</Text>
          <ClinicSelect
            onSelectClinic={(clinic) => setClinic(clinic)}
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Sala</Text>
          <RoomSelect
            selectedClinic={clinic}
            onSelectRoom={(clinic) => setRoom(clinic)}
          />
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
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
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
