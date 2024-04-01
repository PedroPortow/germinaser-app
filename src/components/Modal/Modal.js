import React from 'react';
import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@components' 

const CustomModal = ({ visible, children, onClose, title, subtitle, closeIcon = "close", onConfirm }) => {
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name={closeIcon} size={26} color="black" />
          </TouchableOpacity>
          {title && <Text style={styles.title}>{title}</Text>}
          {onConfirm && <Text style={styles.confirmLabel}>Confirmar</Text>}
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
    position: 'absolute', 
    left: 10, 
  },
  header: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 45,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  confirmLabel: {
    fontWeight: "semibold",
    fontSize: 18,
    position: 'absolute', 
    right: 10, 
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
    marginTop: 0,
  }
});

export default CustomModal;
