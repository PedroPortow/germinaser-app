import React from 'react';
import { Button, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Text from '../../components/Text/Text';

function Profile() {

  return (
    <SafeAreaView>
      <Text style={styles.mainText}>oi</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  }
})

export default Profile;
