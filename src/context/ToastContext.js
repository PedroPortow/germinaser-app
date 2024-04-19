import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Toast } from '@components'

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('');

  const showToast = useCallback(({message, theme}) => {
    setMessage(message);
    setTheme(theme);
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  const values = useMemo(() => ({
    showToast,
    hideToast
  }), [showToast, hideToast]);

  return (
    <ToastContext.Provider value={values}>
      {children}
      {isVisible && <Toast message={message} isVisible={isVisible} theme={theme} onDismiss={hideToast} />}
    </ToastContext.Provider>
  );
};
