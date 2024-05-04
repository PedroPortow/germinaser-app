import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'

function AgendaModal() {
  return (
    <CalendarProvider date={selectedDate} onDateChanged={(date) => setSelectedDate(date)}>
      <ExpandableCalendar firstDay={1} />

      {/* <Agenda /> */}
      {/* <AgendaList
        renderItem={() => <AgendaItem />}
        sections={Object.keys(items).map((key) => ({ title: key, data: items[key] }))}
      /> */}
    </CalendarProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default AgendaModal
