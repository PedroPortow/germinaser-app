import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUserContext } from '../../../context/UserContext';
import { Text, Button, Card } from "@components"

function Account() {

  const { user, logout } = useUserContext()

  console.log({user})



  console.log("aeaeaea")
  return (
    <Fragment>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Olá, {user.name}!</Text>
      </View>
    </Fragment>

  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
  topContainer: {
    backgroundColor: "#479BA7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 170
  },
  topText: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 18,
    marginTop: 'auto'
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  }
})

export default Account;
