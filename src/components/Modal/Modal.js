import React from 'react'
import { View, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Text from '../Text/Text'
import Button from '../Button/Button'

function CustomModal({
  visible,
  children,
  onClose,
  title,
  closeIcon = 'close',
  onConfirm,
  buttonLabel = 'Confirmar',
  disableConfirm,
  animationOut = 'slideOutDown',
  theme = 'primary',
}) {
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      animationIn="slideInUp"
      // animationOut="slideOutRight"
      animationOut={animationOut}
    >
      <SafeAreaView style={styles.modalContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name={closeIcon} size={26} color="black" />
          </TouchableOpacity>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        <View style={styles.childrenContent}>{children}</View>
        {onConfirm && (
          <LinearGradient
            colors={['#ffffff00', '#ffffff']}
            locations={[0, 0.25]}
            style={styles.footerGradient}
          >
            <Button
              style={styles.confirmButton}
              onPress={onConfirm}
              theme={theme == 'primary' ? 'primary' : 'destructiveOutline'}
              disabled={disableConfirm}
            >
              {buttonLabel}
            </Button>
          </LinearGradient>
        )}
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  footerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  confirmButton: {
    width: '80%',
    alignSelf: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonLabel: {
    fontWeight: 'semibold',
    fontSize: 18,
    position: 'absolute',
    right: 10,
  },
  subtitle: {
    fontWeight: 'semibold',
    fontSize: 19,
    color: 'gray',
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  childrenContent: {
    marginTop: 0,
  },
})

export default CustomModal
