import { Text, View } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ClinicSelect } from '../../../components'
import { CalendarProvider } from 'react-native-calendars'
import { WeekSchedule } from './components'


function Schedule() {
  const [selectedClinic, setSelectedClinic] = useState(1)


  const handleSelectClinic = () => {

  }



  return (
    <>
      <View style={styles.topContainer}>
        <ClinicSelect
          variant='unstyled'
          onSelectClinic={handleSelectClinic}
          selectedClinic={selectedClinic}
          withAllOption={false}
          style={styles.select}
          iconColor='white'
        />
      </View>
      <WeekSchedule />

    </>

  )
}

const styles = StyleSheet.create({
  select: {
    width: 200,
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
});

export default Schedule;
