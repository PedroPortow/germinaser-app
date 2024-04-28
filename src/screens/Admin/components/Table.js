import React from 'react'
import { Card, Text } from '@components'
import { StyleSheet } from 'react-native'

function Table({ headerText, data, listItem, separator = true, onEndReached }) {
  return (
    <Card style={styles.card}>
      <Text style={styles.tableTitle}>{headerText}</Text>
      <List
        style={styles.list}
        data={data}
        renderItem={listItem}
        ItemSeparatorComponent={separator ? () => <Divider /> : null}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.001}
        // contentContainerStyle={styles.listContainer}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  tableTitle: {
    fontWeight: 'bold',
    marginLeft: 24,
  },
  card: {
    flexDirection: 'column',
  },
})

export default Table
