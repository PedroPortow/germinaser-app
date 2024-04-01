import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Modal, Text } from "@components";
import RNPickerSelect from 'react-native-picker-select';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import ChooseDateModal from "./components/ChooseDateModal";

const BookingModal = ({ visible, onClose }) => {
  const [room, setRoom] = useState()
  const [clinic, setClinic] = useState()

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Reserva"
      subtitle="Você possui 2 créditos de reserva disponíveis"
    >
      <ChooseDateModal 
        room={"Sala Azul"}
      />
      <View style={styles.content}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Casa</Text>
          <RNPickerSelect
            onValueChange={(value) => setClinic(value)}
            darkTheme={true}
            value={room}
            style={pickerSelectStyles}
            items={[
                { label: 'Casa 1', value: 'Casa 1' },
                { label: 'Casa 2', value: 'Casa 2' },
            ]}
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Sala</Text>
          <RNPickerSelect
            onValueChange={(value) => setRoom(value)}
            value={room}
            darkTheme={true}
            style={pickerSelectStyles}
            items={[
                { label: 'Sala Azul', value: 'Sala Azul' },
                { label: 'Sala Azul', value: 'Sala Azul' },
                { label: 'Sala Azul', value: 'Sala Azul' },
            ]}
          />
        </View>
        <View style={styles.calendarSection}>
          <Text style={styles.label}>Data</Text>
          <Pressable 
            style={styles.pressableInput}
            onPress={() => console.log("eae")}
          >
            <Text>Selecione a data...</Text>
          </Pressable>
          {/* <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
          /> */}
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    gap: 26,
    // backgroundColor: "red"
  
  },
  calendarSection: {
    marginTop: 20
  },
  pressableInput: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    height: 45,
    color: 'black',
    paddingRight: 30,
  },
  inputLabelWrapper: {
    flexDirection: "column",
    gap: 4
  },
  select: {
    backgroundColor: "red",
    width: "100%",
    height: "100%"
  },
  label: {
    fontSize: 20
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default BookingModal;
