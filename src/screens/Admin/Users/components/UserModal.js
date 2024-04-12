import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IndexPath, Input, Select, SelectItem } from '@ui-kitten/components'
import { ConfirmableModal, Loader, NumberInput } from '@components'
import { useFormFilled } from '@hooks'
import { apiCreateUser, apiDeleteUser, apiGetRoles, apiUpdateUser } from '../../../../services/user'

function UserModal({ user, visible, close, onSubmit }) {
  const [rolesOptions, setRolesOptions] = useState([])
  // todo: arrumar o loader n ta pegando nessas modals
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [credits, setCredits] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()

  console.log(name)
  console.log(user.name)

  const creatingUser = useMemo(() => !Object.keys(user).length, [user])

  // kitten-ui
  const [selectedRoleIndex, setSelectedRoleIndex] = useState()

  const isFormFilled = useFormFilled({ name, email, password, role })

  const onChangeRole = (index) => {
    setSelectedRoleIndex(index)
    const roleValue = rolesOptions[index.row].value
    setRole(roleValue)
  }

  const handleDeleteUser = async () => {
    try {
      await apiDeleteUser(user.id)
      onSubmit()
      close()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (visible) {
      getRoles()
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
    console.log({ user })
    setCredits(user.credits)
  }

  console.log({ user })

  console.log({ rolesOptions })

  const getRoles = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetRoles()

      const ROLES_LABEL = {
        user: 'Usuário',
        owner: 'Dono',
        admin: 'Administrador',
      }

      const formattedResponse = response.data.roles.map((role) => ({
        label: ROLES_LABEL[role],
        value: role,
      }))

      setRolesOptions(formattedResponse)
      setUserRole()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const setUserRole = () => {
    const roleIndex = rolesOptions.findIndex((role) => role.value === user.role)
    setSelectedRoleIndex(new IndexPath(roleIndex))
  }

  const handleCreateUser = async () => {
    try {
      const params = {
        name,
        email,
        credits,
        password,
        role,
      }

      const response = await apiCreateUser(params)
      onSubmit()
      console.log({ response })
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleEditUser = async () => {
    try {
      const params = {
        name,
        email,
        credits,
        role,
      }

      const response = await apiUpdateUser(user.id, params)
      onSubmit()
      console.log({ response })
      close()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasEdits = useMemo(
    () =>
      name !== user.name ||
      email !== user.email ||
      password !== user.password ||
      role !== user.role,
    [name, email, password, role, user]
  )

  return (
    <>
      <Loader loading={isLoading} />
      <ConfirmableModal
        visible={visible}
        backdropStyle={styles.backdrop}
        close={close}
        cancelButtonTheme={creatingUser ? 'basic' : 'danger'}
        // cancelButtonAppearence={creatingUser ? 'outline' : 'ghost'}
        confirmButtonDisabled={creatingUser ? !isFormFilled : !hasEdits}
        cancelButtonLabel={creatingUser ? 'Cancelar' : 'Excluir Usuário'}
        confirmButtonLabel={creatingUser ? 'Criar Usuário' : 'Salvar alterações'}
        onConfirm={creatingUser ? handleCreateUser : handleEditUser}
        onCancel={creatingUser ? () => close() : handleDeleteUser}
      >
        <View style={styles.cardContainer}>
          <Input
            placeholder="Nome do Usuário"
            value={name}
            label="Nome"
            autoCapitalize="none"
            onChangeText={(value) => setName(value)}
          />
          <Input
            placeholder="usuario@gmail.com"
            value={email}
            autoCapitalize="none"
            label="Email"
            onChangeText={(value) => setEmail(value)}
          />
          {creatingUser && (
            <Input
              value={password}
              label="Senha"
              caption="Mínimo de 6 caractéres"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
            />
          )}
          <NumberInput
            initialValue={user.credits || 0}
            label="Créditos"
            onChange={(value) => setCredits(value)}
          />
          <Select
            selectedIndex={selectedRoleIndex}
            onSelect={onChangeRole}
            label="Cargo"
            value={rolesOptions[selectedRoleIndex?.row]?.label || 'Selecione uma opção'}
            placeholder="Cargo"
          >
            {rolesOptions.map((role) => (
              <SelectItem key={role.value} title={role.label} />
            ))}
          </Select>
        </View>
      </ConfirmableModal>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default UserModal
