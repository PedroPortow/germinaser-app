import React from 'react'
import { Modal, Text, Loader } from '@components'
import { StyleSheet, View } from 'react-native'

function BookingFilterModal({ onClose, onConfirm, visible }) {
  return (
    <Modal 
      visible={visible}
      onClose={onClose}
      theme="primary"
      buttonLabel="Filtrar"
      onConfirm={onConfirm}
    >
        <Text>oi</Text>
    </Modal>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardContent: {
    flexDirection: 'column',
    gap: 24,
    marginTop: 18,
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
})

export default BookingFilterModal
