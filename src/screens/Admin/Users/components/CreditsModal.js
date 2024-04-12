import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ConfirmableModal, Loader, NumberInput, Text } from '@components'
import { apiUpdateUser } from '../../../../services/user'

function CreditsModal({ user, visible, close, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false)
  const [credits, setCredits] = useState(user.credits)

  const handleUpdateCredits = async () => {
    setIsLoading(true)
    try {
      const params = {
        credits,
      }

      await apiUpdateUser(user.id, params)
      onSubmit()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      close()
    }
  }

  const hasChangedCredits = useMemo(() => credits !== user.credits, [credits])

  return (
    <>
      <Loader loading={isLoading} />
      <ConfirmableModal
        visible={visible}
        backdropStyle={styles.backdrop}
        close={close}
        cancelButtonLabel="Cancelar"
        confirmButtonLabel="Salvar alterações"
        confirmButtonDisabled={!hasChangedCredits}
        cancelButtonTheme="basic"
        onConfirm={handleUpdateCredits}
        onCancel={() => close()}
      >
        <View style={styles.cardContainer}>
          <Text>Usuário: {user.name}</Text>
          <NumberInput
            onChange={(value) => setCredits(value)}
            label="Créditos"
            initialValue={user.credits}
          />
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

export default CreditsModal
