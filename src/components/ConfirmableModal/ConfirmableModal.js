import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Card from '../Cards/Card'

function ConfirmableModal({
  visible,
  close,
  children,
  cancelButtonLabel,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonAppearence = 'ghost',
  cancelButtonTheme = 'danger',
  confirmButtonAppearence = 'outline',
  confirmButtonTheme = 'primary',
  confirmButtonDisabled,
  cancelButtonDisabled,
}) {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={close}
      animationType="slide"
    >
      <Card style={styles.cardContainer}>
        {/* <FontAwesome name="close" size={22} color="black" /> */}
        <View style={styles.cardContent}>{children}</View>
        <View style={styles.cardFooter}>
          {cancelButtonLabel ? (
            <Button
              onPress={onCancel}
              appearance={cancelButtonAppearence}
              status={cancelButtonTheme}
              size="medium"
              disabled={cancelButtonDisabled}
              style={styles.modalButton}
            >
              {cancelButtonLabel}
            </Button>
          ) : null}
          {confirmButtonLabel ? (
            <Button
              onPress={onConfirm}
              appearance={confirmButtonAppearence}
              status={confirmButtonTheme}
              disabled={confirmButtonDisabled}
              style={styles.modalButton}
            >
              {confirmButtonLabel}
            </Button>
          ) : null}
        </View>
      </Card>
    </Modal>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 350,
    flexDirection: 'column',
    gap: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    flex: 1,
  },
})

export default ConfirmableModal
