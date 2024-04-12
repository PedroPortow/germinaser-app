import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Button } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import { Loader } from '@components'
import Table from '../components/Table'
import ClinicModal from './components/ClinicModal'
import { apiGetClinics } from '../../../services/clinics'

function Clinics() {
  const [clinics, setClinics] = useState([])
  const [clinicModalVisible, setClinicModalVisible] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getClinics = async () => {
    setClinics([])
    setIsLoading(true)

    try {
      const response = await apiGetClinics()

      setClinics(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getClinics()
  }, [])

  const openCreateClinicModal = () => {
    setSelectedClinic({})
    setClinicModalVisible(true)
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={item.address}
      style={styles.listItem}
      accessoryRight={() => (
        <Feather
          name="edit"
          size={18}
          color="black"
          onPress={() => {
            setSelectedClinic(item)
            setClinicModalVisible(true)
          }}
        />
      )}
    />
  )

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

      <ClinicModal
        clinic={selectedClinic}
        visible={clinicModalVisible}
        close={() => setClinicModalVisible(false)}
        onSubmit={() => getClinics()}
      />
      <Table data={clinics} listItem={renderItem} />
      <Button appearance="ghost" onPress={openCreateClinicModal}>
        + Adicionar Clínica
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    height: 50,
  },
})

export default Clinics
