import React from 'react'
import { StyleSheet, View } from 'react-native'

function Card({ children, style, border = false }) {
  return <View style={[styles.container, style, border ? styles.border : null]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 8,
    width: '100%',
  },
  border: {
    borderWidth: 0.5,
    borderColor: '#333',
  },
})

export default Card
