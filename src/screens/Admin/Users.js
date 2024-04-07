import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, Card } from '@components'
import { List, ListItem, Divider } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'

function Users() {
  const data = new Array(8).fill({
    name: 'Pedro porto',
    description: 'Description for Item',
  })

  const renderItem = ({ item }) => <ListItem title={`${item.name}`} style={styles.listItem} />

  return (
    <SafeAreaView style={styles.container}>
      <Text>Usuários</Text>
      <Card style={styles.card}>
        <List
          style={styles.list}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'column',
  },
  list: {
    marginTop: 16,
  },
  listItem: {
    height: 50,
    // backgroundColor: 'red'
  },
})

export default Users
