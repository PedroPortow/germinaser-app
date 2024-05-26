import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
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

    console.log({params})

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

  console.log({selectedTimeSlot})

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.safeArea}>
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
            minDate={new Date()}
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
          {selectedTimeSlot && (
            <Button
              style={styles.confirmationButton}
              onPress={() => onConfirm(selectedDay, selectedTimeSlot)}
            >
              Confirmar
            </Button>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timeSlotsWrapper: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    height: 350,
    flexDirection: 'column',
    gap: 4
  },
  confirmationButton: {
    alignSelf: 'center',
    width: '93%',
    marginTop: 14
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
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  timeSlotsText: {
    fontWeight: '500',
    fontSize: 18,
  },
  timeSlotsContainer: {
    flexDirection: 'column',
    gap: 4,
    marginTop: 4,
    maxHeight: 500,
  },
  timeSlotButton: {
    marginBottom: 4,
  },
})

export default ChooseDateModal
