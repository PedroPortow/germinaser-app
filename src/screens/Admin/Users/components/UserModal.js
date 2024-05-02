import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {  Loader, NumberInput, Text, Button, RolesSelect } from '@components'
import { Input, Pressable, Icon, Divider } from 'native-base'
import { apiCreateUser, apiDeleteUser,  apiUpdateUser } from '../../../../services/user'
import ConfirmationModal from '../../../../components/ConfirmationModal'

function UserModal({ user = {}, visible, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [credits, setCredits] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()

  const [hidePassword, setHidePassword] = useState(true)

  const creatingUser = useMemo(() => !Object.keys(user).length, [user])

  const handleDeleteUser = async () => {
    setIsLoading(true)
    try {
      await apiDeleteUser(user.id)
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteUserModalVisible(false)
      setIsLoading(false)
      onConfirm()
      onClose()
    }
  }

  useEffect(() => {
    if (visible) {
      setSelectedUserInfo()
    }
  }, [visible])

  useEffect(() => {
    if (visible && creatingUser) {
      setCredits(0)
    }
  }, [visible, creatingUser])

  const setSelectedUserInfo = () => {
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setCredits(user.credits)
  }

  const handleCreateUser = async () => {
    setIsLoading(true)

    try {
      const params = {
        name,
        email,
        credits,
        password,
        role,
      }

      await apiCreateUser(params)
    } catch (error) {
      console.error(error)
    } finally {
      onConfirm()
      onClose()
      setIsLoading(false)
    }
  }
  const handleEditUser = async () => {
    setIsLoading(true)
    try {
      const params = {
        name,
        email,
        credits,
        role,
      }

      await apiUpdateUser(user.id, params)
    } catch (error) {
      console.error(error)
    } finally {
      onConfirm()
      onClose()
      setIsLoading(false)
    }
  }

  return (
    <>
      <ConfirmationModal
        visible={deleteUserModalVisible}
        onClose={() => setDeleteUserModalVisible(false)}
        title="Atenção"
        onConfirm={handleDeleteUser}
      >
        <Text>
          Esta é uma ação permanente, ao remover um usuário todas as reservas associadas ao mesmo
          também serão removidas
        </Text>
      </ConfirmationModal>
      <Loader loading={isLoading} />
      <View style={styles.cardContainer}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Nome</Text>
          <Input
            value={name}
            size="lg"
            variant="outline"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Email</Text>
          <Input
            value={email}
            size="lg"
            variant="outline"
            placeholder="usuario@gmail.com"
            autoCapitalize={false}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        {creatingUser && (
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Senha</Text>
            <Input
              type={hidePassword ? 'text' : 'password'}
              size="lg"
              variant="outline"
              autoCapitalize={false}
              InputRightElement={
                <Pressable onPress={() => setHidePassword(!hidePassword)}>
                  <Icon
                    as={
                      <Ionicons
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="black"
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
        )}
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Cargo</Text>
          <RolesSelect onSelectRole={(role) => setRole(role)} selectedRole={role} />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Créditos</Text>
          <NumberInput onChange={(value) => setCredits(value)} initialValue={user.credits} />
        </View>
        {!creatingUser && (
          <>
            <Divider />
            <Button
              icon="trash"
              theme="destructive"
              onPress={() => setDeleteUserModalVisible(true)}
              style={styles.destructiveButtonWidth}
            >
              Remover usuário
            </Button>
          </>
        )}
        <Button
          style={creatingUser ? styles.createButtonPosition : styles.editButtonPosition}
          onPress={creatingUser ? handleCreateUser : handleEditUser}
        >
          {creatingUser ? 'Criar usuário' : 'Salvar alterações'}
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
    padding: 20,
  },
  createButtonPosition: {
    position: 'relative',
    bottom: -180,
    left: 0,
  },
  editButtonPosition: {
    position: 'relative',
    bottom: -240,
    left: 0,
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
})

export default UserModal
