import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';

const BookingModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ marginTop: 50, backgroundColor: 'white', padding: 100 }}>
          <Text>Hello World!</Text>

          <Button
            title="Hide Modal"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </Modal>

    </View>
  );
};

export default BookingModal;
