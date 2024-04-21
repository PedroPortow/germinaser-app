import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { CreateBookingModal } from '@components'

const CreateBookingModalContext = createContext()

export const useCreateBookingModal = () => useContext(CreateBookingModalContext)

export function CreateBookingModalProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  const showCreateBookingModal = useCallback(() => {
    // TODO: Implementar casos para dados pré-selecionados
    setIsVisible(true)
  }, [])

  const closeCreateBookingModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const values = useMemo(
    () => ({
      showCreateBookingModal,
      closeCreateBookingModal,
    }),
    [showCreateBookingModal, closeCreateBookingModal]
  )

  return (
    <CreateBookingModalContext.Provider value={values}>
      {children}
      {isVisible && <CreateBookingModal onClose={closeCreateBookingModal} visible={isVisible} />}
    </CreateBookingModalContext.Provider>
  )
}
