// Componente pra mostrar/cancelar (futuramente editar?) bookings
import React from 'react'
import { Modal, Text, Button, Card } from '@components' 

function BookingModal({ booking, visible, onClose }) {

  return (
    <Modal
    visible={visible}
    onClose={onClose}
    title="Visualizar Reserva"
    confirmLabel="Reservar"
    theme="destructiveOutline"
    buttonLabel="Reservar"
    onConfirm={handleCreateBooking}
  >

  </Modal>
  )
}

export default BookingModal