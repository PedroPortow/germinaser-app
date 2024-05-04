import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { Loader, Card, Text, Button } from '@components'
import { useFullScreenModal } from '../../../context/FullScreenModalContext'
import RoomModal from './components/RoomModal'
import { apiGetRooms } from '../../../services/rooms'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { showModal, hideModal } = useFullScreenModal()
  const [selectedRoom, setSelectedRoom] = useState({})

  const getRooms = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetRooms()
      setRooms(response.data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  const handleOpenRoomModal = (room) => {
    showModal({
      title: room ? 'Editar Usuário' : 'Criar Usuário',
      buttonLabel: room ? 'Salvar alterações' : 'Criar Usuário',
      children: <RoomModal room={room} onClose={hideModal} visible onConfirm={() => getRooms()} />,
    })
  }

  const handleOpenCreditsModal = (room) => {
    setSelectedRoom(room)
    setCreditsModalVisible(true)
  }

  return (
      <SafeAreaView style={styles.container}>
        <Loader loading={isLoading} />
        <Card style={styles.cardList}>
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <Row
                item={item}
                handleOpenRoomModal={handleOpenRoomModal}
                handleOpenCreditsModal={handleOpenCreditsModal}
              />
            )}
            l
            keyExtractor={(item) => item.id.toString()}
          />
        <Button icon="add-outline" style={styles.addRoomButton} onPress={() => {
          setSelectedRoom({})
          handleOpenRoomModal()
        }}>Adicionar Sala </Button>
        </Card>
      </SafeAreaView>
  )

  function Row({ item, handleOpenRoomModal, handleOpenCreditsModal }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.rowContent} onPress={() => handleOpenCreditsModal(item)}>
            <Text style={styles.pressableText}>Alterar créditos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowContent} onPress={() => handleOpenRoomModal(item)}>
            <Feather name="edit" size={20} color="#333" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardList: {
    flexDirection: 'column'
  },  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  pressableText: {
    color: '#0000EE',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  addRoomButton: {
    marginTop: 20
  },  
  icon: {
    marginLeft: 12,
  },
})

export default Rooms
