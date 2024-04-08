import React from 'react'
import { Card, Text } from '@components'
import { StyleSheet } from 'react-native'
import { List, Divider } from '@ui-kitten/components'

function Table({ headerText, data, listItem, separator = true }) {
  return (
    <Card style={styles.card}>
      <Text style={styles.tableTitle}>{headerText}</Text>
      {/* <Divider /> */}
      <List
        style={styles.list}
        data={data}
        renderItem={listItem}
        ItemSeparatorComponent={separator ? () => <Divider /> : null}
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
