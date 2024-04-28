import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Loader } from '@components'
import Table from '../components/Table'
import RoomModal from './components/RoomModal'
import { apiGetRooms } from '../../../services/rooms'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [roomModalVisible, setRoomModalVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getRooms = async () => {
    setRooms([])
    setIsLoading(true)

    try {
      const response = await apiGetRooms()

      console.log(response.data)
      setRooms(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getRooms()
  }, [])

  const openCreateRoomModal = () => {
    setSelectedRoom({})
    setRoomModalVisible(true)
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={item.clinic_name}
      style={styles.listItem}
      accessoryRight={() => (
        <Feather
          name="edit"
          size={18}
          color="black"
          onPress={() => {
            setSelectedRoom(item)
            setRoomModalVisible(true)
          }}
        />
      )}
    />
  )

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

      <RoomModal
        room={selectedRoom}
        visible={roomModalVisible}
        close={() => setRoomModalVisible(false)}
        onSubmit={() => getRooms()}
      />
      <Table data={rooms} listItem={renderItem} />
      <Button appearance="ghost" onPress={openCreateRoomModal}>
        + Adicionar Sala
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

export default Rooms
