import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Text } from "@components";

const BookingModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Reserva"
      subtitle="Você possui 2 créditos de reserva disponíveis"
    >
      <View>
        <Text>Oi</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1, // Faz a view se expandir para ocupar todo o espaço disponível
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookingModal;
