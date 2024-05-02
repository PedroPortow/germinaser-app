import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NumberInput, Text } from '@components'
import { apiUpdateUser } from '../../../../services/user'
import { Modal, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

function CreditsModal({ user, isVisible, onClose, onConfirm }) {
  const [credits, setCredits] = useState()

  const handleUpdateCredits = async () => {
    // setIsLoading(true)
    try {
      const params = {
        credits,
      }

      await apiUpdateUser(user.id, params)
    } catch (error) {
      console.error(error)
    } finally {
      // setIsLoading(false)
      onConfirm()
      onClose()
    }
  }

  useEffect(() => {
    if(isVisible){
      setCredits(user.credits)
    }
  }, [isVisible])

  return (
      <Modal isOpen={isVisible} onClose={onClose} size={'lg'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Alterar créditos</Modal.Header>
          <Modal.Body>
            <View style={styles.content}>
            <View style={styles.rowName}>
              <Ionicons name="person-circle" size={24} color="#666" />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View style={styles.labelInputWrapper}>
              <Text style={styles.userName}>Créditos:</Text>
              <NumberInput onChange={(value) => setCredits(value)} initialValue={credits} />
            </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={onClose}
              >
                Cancelar
              </Button>
              <Button
                onPress={handleUpdateCredits}
              >
                Salvar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
  rowName: {
    flexDirection: 'row',
    gap: 4
  },
  userName: {
    fontSize: 16,
    fontWeight: 'semibold'
  },
  content: {
    flexDirection: 'column',
    gap: 16
  },
  labelInputWrapper: {
    flexDirection: 'column',
    gap: 2
  },  
})

export default CreditsModal
