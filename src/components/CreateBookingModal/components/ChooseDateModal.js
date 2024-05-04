import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text, Button, Loader } from '@components'
import { Calendar } from 'react-native-calendars'
import { apiGetDayAvailableBookings } from '../../../services/bookings'

function ChooseDateModal({ selectedRoom, onClose, visible, onConfirm }) {
  const [selectedDay, setSelectedDay] = useState('')
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchAvailableTimeSlots = async (day) => {
    setIsLoading(true)
    setAvailableTimeSlots([])

    const date = day.dateString

    const params = {
      date,
      room_id: selectedRoom,
    }

    try {
      const response = await apiGetDayAvailableBookings(params)

      setAvailableTimeSlots(response.data.available_slots)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const onSelectDay = (day) => {
    setSelectedTimeSlot(null)
    setSelectedDay(day.dateString)
    fetchAvailableTimeSlots(day)
  }

  if (!visible) {
    return null
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Data e horário para reserva</Text>
        </View>
        <Loader loading={isLoading} />
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#479BA7',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#479BA7',
            dayTextColor: '#2d4150',
            arrowColor: '#479BA7',
          }}
          onDayPress={onSelectDay}

          firstDay={1}
          minDate={new Date()}
          markedDates={{ [selectedDay]: { selected: true } }}
        />
        {selectedDay && availableTimeSlots.length ? (
          <View style={styles.timeSlotsWrapper}>
            <Text style={styles.timeSlotsText}>Horários disponíveis:</Text>
            <ScrollView
              contentContainerStyle={styles.timeSlotsContainer}
              style={{ maxHeight: 500 }}
            >
              {selectedDay &&
                availableTimeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    selected={selectedTimeSlot === slot}
                    theme="outline"
                    style={styles.timeSlotButton}
                    onPress={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
            </ScrollView>
          </View>
        ) : null}
        {selectedTimeSlot && (
          <Button
            style={styles.confirmationButton}
            onPress={() => onConfirm(selectedDay, selectedTimeSlot)}
          >
            Confirmar
          </Button>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  timeSlotsWrapper: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    height: 350
  },
  confirmationButton: {
    alignSelf: 'center',
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendar: {
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 28,
    padding: 16,
  },
  timeSlotsText: {
    fontWeight: 'semibold',
    fontSize: 18,
  },
  timeSlotButton: {
    padding: 12,
    width: '32,5%',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    flexWrap: 'wrap',
  },
})

export default ChooseDateModal
