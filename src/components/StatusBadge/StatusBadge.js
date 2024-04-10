import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const themes = {
  success: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  warning: {
    backgroundColor: '#FFC107',
    color: 'black',
  },
  error: {
    backgroundColor: '#F44336',
    color: 'white',
  },
  info: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
}

function StatusBadge({ status, children }) {
  const theme = themes[status] || themes.info // Default para 'info' se nenhum status compatível for encontrado

  return (
    <View style={[styles.badge, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.color }]}>{children}</Text>
    </View>
  )
}

// Estilos
const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default StatusBadge
