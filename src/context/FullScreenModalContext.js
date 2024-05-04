import React, { createContext, useContext, useState, useCallback } from 'react';
import { FullScreenModal } from '../components';

const FullScreenModalContext = createContext();

export const useFullScreenModal = () => useContext(FullScreenModalContext);

export const FullScreenModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const showModal = useCallback((props) => {
    setModalProps(props);
    setIsVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalProps({}); 
    setIsVisible(false);
  }, []);

  return (
    <FullScreenModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <FullScreenModal
        isVisible={isVisible}
        onClose={hideModal}
        {...modalProps}
      />
    </FullScreenModalContext.Provider>
  );
};
