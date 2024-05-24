import { Alert, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

function CustomAlert({ id, status='info', text }) {
  return (
    <Alert id={id} status={status} variant='left-accent'>
      <Text style={styles.alertText}>{text}</Text>
    </Alert>
  )
}

const styles = StyleSheet.create({
  alertText: {
    fontSize: 15,
    fontWeight: 500
  },
})
export default CustomAlert
