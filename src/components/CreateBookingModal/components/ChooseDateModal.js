import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Loader, Button } from '@components'
import { Calendar } from 'react-native-calendars'
import { Text } from 'native-base'
import { apiGetDayAvailableBookings } from '../../../services/bookings'

function ChooseDateModal({ selectedRoom, onClose, visible, onConfirm, timeSlot, day }) {
  const [selectedDay, setSelectedDay] = useState(day)
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlot)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAvailableTimeSlots = async (day) => {
    setIsLoading(true)
    setAvailableTimeSlots([])

    const params = {
      date: day,
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
    fetchAvailableTimeSlots(day.dateString)
  }

  useEffect(() => {
    if(!!visible && !!timeSlot && !!day){
      fetchAvailableTimeSlots(day)
    }

    setSelectedTimeSlot(timeSlot)
  }, [visible, timeSlot, day])

  if (!visible) {
    return null
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="arrow-back" size={26} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Data da reserva</Text>
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
            minDate={String(new Date())}
            markedDates={{ [selectedDay]: { selected: true } }}
          />
          {selectedDay && availableTimeSlots.length ? (
            <View style={styles.timeSlotsWrapper}>
              <Text style={styles.timeSlotsText}>Horários disponíveis:</Text>
              <ScrollView style={styles.timeSlotsContainer}>
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot}
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
        </View>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  timeSlotsWrapper: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    flex: 1,
  },
  confirmationButton: {
    alignSelf: 'center',
    width: '93%',
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  calendar: {
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  timeSlotsText: {
    fontWeight: '500',
    fontSize: 18,
  },
  timeSlotsContainer: {
    marginTop: 4,
  },
  timeSlotButton: {
    marginBottom: 4,
  },
})

export default ChooseDateModal
