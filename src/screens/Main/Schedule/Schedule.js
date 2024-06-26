import { View } from 'native-base'
import React, { useState } from 'react'
import {  StyleSheet } from 'react-native'
import { ClinicSelect, Loader } from '../../../components'
import {  CalendarSchedule } from './components'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import moment from 'moment'


function Schedule() {
  const [selectedClinic, setSelectedClinic] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));


  return (
      <CalendarProvider date={selectedDate}>
        <Loader loading={isLoading} />

        <View style={styles.topContainer}>
          <ClinicSelect
            variant='unstyled'
            onSelectClinic={(clinic) => setSelectedClinic(clinic)}
            selectedClinic={selectedClinic}
            withAllOption={false}
            style={styles.select}
            iconColor='white'
          />
        </View>
        <ExpandableCalendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          initialPosition='closed'
          allowShadow
          firstDay={1}
          minDate={new Date()}
          markedDates={{ [new Date()]: { selected: true, marked: true } }}
          theme={calendarTheme}
        />
        <CalendarSchedule
          selectedClinic={selectedClinic}
          selectedDate={selectedDate}
          setIsLoading={setIsLoading}
        />
      </CalendarProvider>
  )
}


const calendarTheme = {
  selectedDayBackgroundColor: '#479BA7',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#479BA7',
  arrowColor: '#479BA7',
};

const styles = StyleSheet.create({
  select: {
    width: 50,
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  topContainer: {
    backgroundColor: '#479BA7',
    height: 80,
    paddingHorizontal: 145,
    paddingTop: 40
  },
})

export default Schedule
