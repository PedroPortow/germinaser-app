import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@components'

function FilterButton({ onPress, style }) {
  return (
    <Button
      icon="filter"
      style={[styles.filterButton, style]}ww
      textStyle={{ fontSize: 14 }}
      onPress={onPress}
      iconSize={18}
    >
      Filtros
    </Button>
  )
}

const styles = StyleSheet.create({
  filterButton: {
  },
})

export default FilterButton
