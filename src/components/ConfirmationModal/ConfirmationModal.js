import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { Badge, AlertDialog, Button } from 'native-base'

function ConfirmationAlertDialog({ onConfirm, onCancel, onClose, visible, title, children }) {
  if (!visible) {
    return null
  }

  return (
    <AlertDialog isOpen={visible} onClose={onClose}>
      <AlertDialog.Content maxWidth="400px">
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerButton: {
    width: '100%',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    flexDirection: 'column',
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
})

export default ConfirmationAlertDialog
