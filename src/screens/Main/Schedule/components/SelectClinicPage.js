import { Divider, FlatList, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {  StyleSheet, TouchableOpacity } from 'react-native'
import { apiGetClinics } from '../../../../services/clinics'

function SelectClinicPage() {
  const navigation = useNavigation()
  const [clinicOptions, setClinicOptions] = useState([])

  const getClinicOptions = async () => {
    try {
      const response = await apiGetClinics()

      setClinicOptions(response.data)
    } catch (error) {
      console.error(error.response)
    }
  }

  useEffect(() => {
    getClinicOptions()
  }, [])

  const handleSelectClinic = (clinic) => {
    navigation.navigate('Schedule', { selectedClinic: clinic })
  }

  return (
    <View>
      <FlatList
        data={clinicOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => handleSelectClinic(item)} style={styles.selectOption}>
              <Text style={styles.textOption}>{item.name}</Text>
            </TouchableOpacity>
            <Divider />
          </>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  selectOption: {
    padding: 10,
  },
  textOption: {
    fontSize: 16,
    fontWeight: 500,
  },
})

export default SelectClinicPage
