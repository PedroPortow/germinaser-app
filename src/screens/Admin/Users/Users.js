import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Button } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import { Loader } from '@components'
import Table from '../components/Table'
import { apiGetAllUsers } from '../../../services/user'
import UserModal from './components/UserModal'

function Users() {
  const [users, setUsers] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectUser = (user) => {
    setSelectedUser(user)
    setModalVisible(true)
  }

  const getUsers = async () => {
    setUsers([])
    setIsLoading(true)

    try {
      const response = await apiGetAllUsers()

      console.log(response.data)
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

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={item.email}
      style={styles.listItem}
      accessoryRight={() => (
        <>
          <Button
            onPress={() => console.log('alterar credétios')}
            appearance="ghost"
            status="primary"
          >
            Alterar créditos
          </Button>
          <Feather name="edit" size={18} color="black" onPress={() => handleSelectUser(item)} />
        </>
      )}
    />
  )

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <UserModal
        user={selectedUser}
        visible={modalVisible}
        close={() => setModalVisible(false)}
        onSubmit={() => getUsers()}
      />

      <Table
        headerText="Nome"
        data={users}
        listItem={renderItem}
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
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

export default Users
