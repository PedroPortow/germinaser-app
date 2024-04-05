import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Text from '../../../../components/Text/Text';

function RoundCard({ text, icon, value }) {
  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={22} style={styles.icon} />}
      <View style={styles.textContent}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 8, 
    paddingVertical: 22,
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2,
    elevation: 5, 
    marginVertical: 8,
    width: "48%"
  },
  textContent: {
    flex: 1, 
    // backgroundColor: "red"
  },
  text: {
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#666', 
  },
  value: {
    fontSize: 16, 
    color: '#333',
    fontWeight: 'bold', 
  },
  icon: {
    marginRight: 10, 
  },
});

export default RoundCard;
