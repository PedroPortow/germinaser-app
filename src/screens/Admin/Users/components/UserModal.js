import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Loader, NumberInput, Button, RolesSelect } from '@components'
import { Input, Pressable, Icon, Divider, Text, useToast, Alert } from 'native-base'
import { apiCreateUser, apiDeleteUser, apiUpdateUser } from '../../../../services/user'
import ConfirmationModal from '../../../../components/ConfirmationModal'
import CustomAlert from '../../../../components/CustomAlert'

const CREATE_USER_ERRORS = {
  MISSING_NAME: "Nome não pode ficar em branco",
  MISSING_EMAIL: "Email não pode ficar em branco",
  PASSWORD: "A senha deve conter pelo menos 6 dígitos",
  MISSING_ROLE: "Selecione um cargo",
}

function UserModal({ user = {}, visible, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [credits, setCredits] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()

  const [showPassword, setShowPassword] = useState(false)

  const toast = useToast();

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
    setErrors([])
    setCredits(user.credits)
  }

  const isCreateUserValid = () => {
    const formErrors = []

    if(!name){
      formErrors.push(CREATE_USER_ERRORS.MISSING_NAME)
    }

    if(!email){
      formErrors.push(CREATE_USER_ERRORS.MISSING_EMAIL)
    }

    if(password?.length < 6){
      formErrors.push(CREATE_USER_ERRORS.PASSWORD)
    }

    if(!role){
      formErrors.push(CREATE_USER_ERRORS.MISSING_ROLE)
    }

    if(formErrors.length){
      toast.show({
        placement: "top",
        render: () => <CustomAlert text={`${formErrors.join(", ")}`} status='error'/>
      })

      return false
    }

    return true
  }

  const handleCreateUser = async () => {
    if(!isCreateUserValid()){
      return
    }

    setIsLoading(true)

    console.log("passou")

    try {
      const params = {
        name,
        email,
        credits,
        password,
        role,
      }

      await apiCreateUser(params)

      toast.show({
        placement: "top",
        render: () => <CustomAlert text='Usuário criado com sucesso' status='success'/>
      })
      onConfirm()
      onClose()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text={error.response.data.errors[0]} status='error'/>
      })
      console.error(error.response.data.errors)
    } finally {
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
      toast.show({
        placement: "top",
        render: () => <CustomAlert text='Informações atualizadas com sucesso' status='success'/>
      })
      onConfirm()
      onClose()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => <CustomAlert text={error.response.data.errors[0]} status='error'/>
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log({errors})

  return (
    <>
      <ConfirmationModal
        visible={deleteUserModalVisible}
        onClose={() => setDeleteUserModalVisible(false)}
        title="🚨 Atenção"
        onConfirm={handleDeleteUser}
      >
        <Text style={styles.confirmationText}>
          Ao remover um usuário todas as reservas associadas ao mesmo também serão removidas
        </Text>
      </ConfirmationModal>
      <Loader loading={isLoading} />
      <View style={styles.cardContainer}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Nome</Text>
          <Input
            value={name}
            size="lg"

            placeholder="Digite o nome do usuário"
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
              type={showPassword ? 'text' : 'password'}
              size="lg"
              variant="outline"

              autoCapitalize={false}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
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
        <View style={styles.rowButtons}>
          <View style={styles.inputLabelWrapper}>
            <Text style={styles.label}>Créditos</Text>
            <NumberInput onChange={(value) => setCredits(value)} initialValue={user.credits} />
          </View>
          {creatingUser ? null : (
            <Button
              icon="trash"
              theme="destructive"
              iconSize={14}
              textStyle={styles.textButtonDestructive}
              onPress={() => setDeleteUserModalVisible(true)}
              style={styles.destructiveButton}
            >
              Remover usuário
            </Button>
          )}
        </View>
        <Divider />
        <Button
          style={styles.buttonPosition}
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
  textButtonDestructive: {
    fontSize: 14
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonPosition: {},
  destructiveButton: {
    height: 46,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  inputLabelWrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  confirmationText: {
    fontSize: 16,
    fontWeight: 400,
  },
})

export default UserModal
