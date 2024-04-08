import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Button, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import { ROLES } from '../../constants/constants'
import Table from './components/Table'
import ConfirmableModal from '../../components/ConfirmableModal/ConfirmableModal'

function Users() {
  const data = new Array(16).fill({
    name: 'Pedro porto',
    email: 'pedro@gmail.com',
    credits: 8,
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  // kitten-ui
  const [selectedRoleIndex, setSelectedRoleIndex] = useState()

  const [rolesOptions, setRolesOptions] = useState([])

  const handleDeleteUser = () => {}

  const handleEditUser = (user) => {
    setSelectedUser(user)
    const roleIndex = rolesOptions.findIndex((role) => role.value === user.role)
    setSelectedRoleIndex(new IndexPath(roleIndex))
    setModalVisible(true)

    getUserRoles()
  }

  const getUserRoles = async () => {
    try {
      // const response = await apiGetClinics()
      const response = {
        data: [
          {
            id: 'Dono',
            name: ROLES.OWNER,
          },
          {
            id: 'Administrador',
            name: ROLES.ADMIN,
          },
          {
            id: 'Usuário',
            name: ROLES.USER,
          },
        ],
      }

      const formattedResponse = response.data.map((clinic) => ({
        label: clinic.name,
        value: clinic.id,
      }))

      setRolesOptions(formattedResponse)
    } catch (error) {
      console.error(error)
    } finally {
      // setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      // const post = await post
    } catch {
      // console.error(err)
    } finally {
      //
    }
  }

  const onChangeRole = (index) => {
    setSelectedRoleIndex(index)
    const roleValue = rolesOptions[index.row].value
    updateSelectedUserField('role', roleValue)
  }

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
          <Feather name="edit" size={18} color="black" onPress={() => handleEditUser(item)} />
        </>
      )}
    />
  )

  const updateSelectedUserField = (field, value) => {
    setSelectedUser((prevSelectedUser) => ({
      ...prevSelectedUser,
      [field]: value,
    }))
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.screenTitle}>Usuários</Text> */}
      <ConfirmableModal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        close={() => setModalVisible(false)}
        cancelButtonLabel="Excluir Usuário"
        confirmButtonLabel="Salvar alterações"
        // confirmButtonDisabled
        onConfirm={handleSubmit}
        onCancel={handleDeleteUser}
      >
        <View style={styles.cardContainer}>
          <Input
            placeholder="Nome do Usuário"
            value={selectedUser.name}
            label="Nome"
            onChangeText={(value) => updateSelectedUserField('name', value)}
          />
          <Input
            placeholder="Email do Usuário"
            value={selectedUser.email}
            label="Email"
            onChangeText={(value) => updateSelectedUserField('email', value)}
          />
          <Input
            placeholder="Créditos"
            value={String(selectedUser.credits)}
            label="Créditos"
            keyboardType="numeric"
            onChangeText={(value) => {
              updateSelectedUserField('credits', value)
            }}
          />
          <Select
            selectedIndex={selectedRoleIndex}
            onSelect={onChangeRole}
            label="Cargo"
            value={rolesOptions[selectedRoleIndex?.row]?.label}
            placeholder="Cargo"
          >
            {rolesOptions.map((role) => (
              <SelectItem key={role.value} title={role.label} />
            ))}
          </Select>
        </View>
      </ConfirmableModal>

      <Table
        headerText="Nome"
        data={data}
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
    // backgroundColor: 'red',
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  listItem: {
    height: 50,
    // backgroundColor: 'red',
  },
})

export default Users
