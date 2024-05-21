import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';

function Schedule() {
  // Format the initial date to 'YYYY-MM-DD'
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const sections = [
         { title: '2024-05-12', data: [{ name: 'Meeting with team' }] },
         { title: '2024-05-13', data: [{ name: 'Doctor appointment' }] },
         { title: '2024-05-14', data: [{ name: 'Flight to NY' }, { name: 'Meet with clients' }] }]

  const onDateChanged = date => {
    console.log('Selected date', date);
    // Assume date is already in 'YYYY-MM-DD' format; if not, it must be converted
    setCurrentDate(date);
  };

  const onMonthChange = ({ dateString }) => {
    console.log('Month changed to', dateString);
    // dateString is expected to be in the correct format
    setCurrentDate(dateString);
  };

  const ITEMS = useMemo(() => {
    return {
      '2024-05-10': [{ title: 'Meeting', start: '10:00', end: '11:00' }],
      '2024-05-11': [{ title: 'Conference', start: '12:00', end: '13:00' }]
    };
  }, []);

  const renderItem = ({ item }) => (
       <View style={styles.itemContainer}>
           <Text>{item.name}</Text>
       </View>
   );

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
    >
      <WeekCalendar firstDay={1} />
      <AgendaList
      sections={sections}
        renderItem={renderItem}
        theme={{agendaDayTextColor: 'yellow', agendaDayNumColor: 'green', agendaTodayColor: 'red'}}
      />
    </CalendarProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Schedule;
