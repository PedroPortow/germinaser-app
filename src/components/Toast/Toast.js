import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Text from '../Text/Text'

const THEMES = {
  success: {
    backgroundColor: 'rgb(6, 130, 0)',
    icon: 'checkcircle',
    textColor: 'white',
  },
  error: {
    backgroundColor: 'red',
    icon: 'closecircle',
    textColor: 'white',
  },
}

function Toast({ message, isVisible, onDismiss, theme = 'success' }) {
  const [visible, setVisible] = useState(isVisible)
  const slideAnim = new Animated.Value(-100)

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()

      const timeout = setTimeout(() => {
        closeToast()
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [visible])

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  const closeToast = () => {
    Animated.timing(slideAnim, {
      toValue: -175,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onDismiss())
  }

  if (!visible) return null

  const themeSettings = THEMES[theme] || THEMES.success // Default to success if no theme provided

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: themeSettings.backgroundColor, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={closeToast}>
        <AntDesign name={themeSettings.icon} size={24} color={themeSettings.textColor} />
      </TouchableOpacity>
      <Text style={[styles.text, { color: themeSettings.textColor }]}>{message}</Text>
      {/* <TouchableOpacity style={styles.closeButton} onPress={closeToast}>
        <AntDesign name="close" size={18} color={themeSettings.textColor} />
      </TouchableOpacity> */}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    zIndex: 99999,
    top: 40,
    left: 0,
    right: 0,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 5,
  },
})

export default Toast
