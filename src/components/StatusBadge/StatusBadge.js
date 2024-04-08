import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function StatusBadge({ status }) {
  const statusMapping = {
    active: {
      text: 'Reservado',
      backgroundColor: '#1a6b2c', // Verde um pouco mais escuro
      textColor: '#FFFFFF',
      borderColor: '#28a745', // Verde original para borda e círculo
    },
    canceled: {
      text: 'Cancelado',
      backgroundColor: '#951a26', // Vermelho um pouco mais escuro
      textColor: '#FFFFFF',
      borderColor: '#dc3545', // Vermelho original para borda e círculo
    },
    realized: {
      text: 'Realizado',
      backgroundColor: '#0f6876', // Azul um pouco mais escuro
      textColor: '#FFFFFF',
      borderColor: '#17a2b8', // Azul original para borda e círculo
    },
  }

  const { text, backgroundColor, textColor, borderColor } = statusMapping[status] || {}

  return (
    <View style={[styles.badge, { borderColor, backgroundColor }]}>
      <View style={[styles.circle, { backgroundColor: borderColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default StatusBadge
