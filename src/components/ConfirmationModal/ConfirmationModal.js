import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Badge, AlertDialog, Button, Text } from 'native-base'

function ConfirmationAlertDialog({ onConfirm, onCancel, onClose, visible, title, children }) {
  if (!visible) {
    return null
  }

  return (
    <AlertDialog isOpen={visible} onClose={onClose} size='lg'>
      <AlertDialog.Content >
        <AlertDialog.CloseButton />
        {!!title && <AlertDialog.Header>{title}</AlertDialog.Header>}
        <AlertDialog.Body>
          <View style={styles.content}>{children}</View>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={onClose}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="danger"
              onPress={onConfirm}
              >
                Confirmar
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    gap: 24,
  },
})

export default ConfirmationAlertDialog
