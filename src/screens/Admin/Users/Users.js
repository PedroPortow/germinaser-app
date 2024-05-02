import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { Loader, Card, Text, Button } from '@components'
import { apiGetAllUsers } from '../../../services/user'
import { useFullScreenModal } from '../../../context/FullScreenModalContext'
import UserModal from './components/UserModal'
import CreditsModal from './components/CreditsModal'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { showModal, hideModal } = useFullScreenModal()
  const [creditsModalVisible, setCreditsModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetAllUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleOpenUserModal = (user) => {
    showModal({
      title: user ? 'Editar Usuário' : 'Criar Usuário',
      buttonLabel: user ? 'Salvar alterações' : 'Criar Usuário',
      children: <UserModal user={user} onClose={hideModal} visible onConfirm={() => getUsers()} />,
    })
  }

  const handleOpenCreditsModal = (user) => {
    setSelectedUser(user)
    setCreditsModalVisible(true)
  }

  return (
      <SafeAreaView style={styles.container}>
        <CreditsModal
          user={selectedUser}
          isVisible={creditsModalVisible}
          onConfirm={() => getUsers()}
          onClose={() => {
            setSelectedUser({})
            setCreditsModalVisible(false)
          }}
        />
        <Loader loading={isLoading} />
        <Card style={styles.cardList}>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Row
                item={item}
                handleOpenUserModal={handleOpenUserModal}
                handleOpenCreditsModal={handleOpenCreditsModal}
              />
            )}
            l
            keyExtractor={(item) => item.id.toString()}
          />
        <Button icon="add-outline" style={styles.addUserButton} onPress={() => {
          setSelectedUser({})
          handleOpenUserModal()
        }}>Adicionar Usuário</Button>
        </Card>
      </SafeAreaView>
  )

  function Row({ item, handleOpenUserModal, handleOpenCreditsModal }) {
    return (
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.rowContent} onPress={() => handleOpenCreditsModal(item)}>
            <Text style={styles.pressableText}>Alterar créditos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowContent} onPress={() => handleOpenUserModal(item)}>
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
  addUserButton: {
    marginTop: 20
  },  
  icon: {
    marginLeft: 12,
  },
})

export default Users
