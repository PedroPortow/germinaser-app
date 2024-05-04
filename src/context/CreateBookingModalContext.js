import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { CreateBookingModal } from '@components'

const CreateBookingModalContext = createContext()

export const useCreateBookingModal = () => useContext(CreateBookingModalContext)

export function CreateBookingModalProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const [refetchTrigger, setRefetchTrigger] = useState(0) // triste

  const showCreateBookingModal = useCallback(() => {
    // TODO: Implementar casos para dados pré-selecionados
    setIsVisible(true)
  }, [])

  const closeCreateBookingModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const triggerRefetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1)
  }, [])

  const values = useMemo(
    () => ({
      showCreateBookingModal,
      closeCreateBookingModal,
      refetchTrigger,
    }),
    [showCreateBookingModal, closeCreateBookingModal, refetchTrigger]
  )

  return (
    <CreateBookingModalContext.Provider value={values}>
      {children}
      {isVisible && (
        <CreateBookingModal
          onClose={closeCreateBookingModal}
          visible={isVisible}
          onCreate={triggerRefetch}
        />
      )}
    </CreateBookingModalContext.Provider>
  )
}
