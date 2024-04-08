import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Spinner } from '@ui-kitten/components'

function Loader({ loading = true, size = 'large' }) {
  if (!loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <Spinner animating size={size} style={styles.loader} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loader: {
    zIndex: 999999, // todo: arrumar o loader n funcionando nas modais
  },
})

export default Loader
