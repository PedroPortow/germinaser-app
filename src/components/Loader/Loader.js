import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Spinner } from 'native-base'

function Loader({ loading = true, size="sm" }) {
  if (!loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLoader}>
        <Spinner size={size}/>
      </View>
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
  backgroundLoader: {
    padding: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
  },
})

export default Loader
