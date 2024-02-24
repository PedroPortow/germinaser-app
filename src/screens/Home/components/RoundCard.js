import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Text from '../../../components/Text/Text';

function RoundCard({ text, icon, subtext }) {
  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={24} style={styles.icon} />}
      <View style={styles.textContent}>
        <Text style={styles.text}>{text}</Text>
        {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16, 
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
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333',
  },
  subtext: {
    fontSize: 14, 
    color: '#666', 
  },
  icon: {
    marginRight: 10, 
  },
});

export default RoundCard;
