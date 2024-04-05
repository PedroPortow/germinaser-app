import React from 'react';
import { StyleSheet,  View } from 'react-native';
import Text from '../../../../components/Text/Text';

function RoundCard({ text, icon, value }) {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.textContent}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 8, 
    paddingVertical: 14,
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
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333',
  
  },
  value: {
    fontSize: 14, 
    color: '#666', 
    fontWeight: 'bold', 
  },
});

export default RoundCard;
