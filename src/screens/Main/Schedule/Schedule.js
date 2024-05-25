import { View } from 'native-base'
import React, { useState } from 'react'
import {  StyleSheet } from 'react-native'
import { ClinicSelect, Loader } from '../../../components'
import {  CalendarSchedule } from './components'


function Schedule() {
  const [selectedClinic, setSelectedClinic] = useState(1)
  const [isLoading, setIsLoading] = useState(false)


  return (
    <>
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
      <CalendarSchedule 
        selectedClinic={selectedClinic}
        setIsLoading={setIsLoading}
      />

    </>

  )
}

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
