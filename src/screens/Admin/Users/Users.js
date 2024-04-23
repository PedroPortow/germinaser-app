import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Button } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import { Loader } from '@components'
import Table from '../components/Table'
import { apiGetAllUsers } from '../../../services/user'
import UserModal from './components/UserModal'
import CreditsModal from './components/CreditsModal'

function Users() {
  const [users, setUsers] = useState([])
  const [userModalVisible, setUserModalVisible] = useState(false)
  const [creditsModalVisible, setCreditsModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async () => {
    setUsers([])
    setIsLoading(true)

    try {
      const response = await apiGetAllUsers()

      setUsers(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const openCreateUserModal = () => {
    setSelectedUser({})
    setUserModalVisible(true)
  }

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={item.email}
      style={styles.listItem}
      accessoryRight={() => (
        <View style={styles.rowContent}>
          <Button
            onPress={() => {
              setSelectedUser(item)
              setCreditsModalVisible(true)
            }}
            style={styles.button}
            appearance="ghost"
            status="primary"
          >
            Alterar créditos
          </Button>
          {/* <Feather
            name="trash-2"
            size={18}
            color="red"
            onPress={() => {
              setSelectedUser(item)
              setUserModalVisible(true)
            }}
          /> */}
          <Feather
            name="edit"
            size={18}
            color="black"
            style={styles.editIcon}
            onPress={() => {
              setSelectedUser(item)
              setUserModalVisible(true)
            }}
          />
        </View>
      )}
    />
  )

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

      <UserModal
        user={selectedUser}
        visible={userModalVisible}
        close={() => setUserModalVisible(false)}
        onSubmit={() => getUsers()}
      />
      <CreditsModal
        user={selectedUser}
        visible={creditsModalVisible}
        close={() => setCreditsModalVisible(false)}
        onSubmit={() => getUsers()}
      />

      <Table data={users} listItem={renderItem} />
      <Button appearance="ghost" onPress={openCreateUserModal}>
        + Adicionar Usuário
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  // editIcon: {
  //   marginLeft: 12,
  // },
  listItem: {
    height: 50,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Users
