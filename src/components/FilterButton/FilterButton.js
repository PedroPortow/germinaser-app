import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Text, Button } from '@components'

function FilterButton({ onPress, style }) {
  return (
    <Button icon="filter" style={[styles.filterButton, style]} onPress={onPress}>
      Filtros
    </Button>
  )
}

const styles = StyleSheet.create({
  filterButton: {
    width: 120,
  },
})

export default FilterButton
