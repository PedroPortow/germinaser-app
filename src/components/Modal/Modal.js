import React from 'react';
import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@components' 

const CustomModal = ({ visible, children, onClose, title, subtitle }) => {
  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <SafeAreaView style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.titleSection}>
         {title && <Text style={styles.title}>{title}</Text>}
         {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.childrenContent}>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  closeButton: {
    marginTop: 50,
  },
  titleSection: {
    marginTop: 25,
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26
  },
  subtitle: {
    fontWeight: "semibold",
    fontSize: 19 ,
    color: "gray"
  },
  modalContent: {
    flex: 1, 
    flexDirection: "column",
    backgroundColor: 'white',
    borderRadius: 20, 
    padding: 10,
  },
  childrenContent: {
    marginTop: 25,
  }
});

export default CustomModal;
