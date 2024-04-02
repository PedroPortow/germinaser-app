import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Modal, Text } from "@components";
import RNPickerSelect from "react-native-picker-select";
import ChooseDateModal from "./components/ChooseDateModal";

const BookingModal = ({ visible, onClose }) => {
  const [room, setRoom] = useState();
  const [clinic, setClinic] = useState();
  const [dateModalVisible, setDateModalVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const onChooseDate = (day, timeslot) => {
    setSelectedDay(day);
    setSelectedTimeSlot(timeslot);
    setDateModalVisible(false);
  };

  const onSubmit = () => {};

  console.log({ selectedDay });
  console.log({ selectedTimeSlot });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Reserva"
      confirmLabel="Reservar"
      onConfirm={onSubmit}
    >
      <ChooseDateModal
        room={"Sala Azul"}
        onClose={() => setDateModalVisible(false)}
        visible={dateModalVisible}
        onConfirm={onChooseDate}
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
              { label: "Casa 1", value: "Casa 1" },
              { label: "Casa 2", value: "Casa 2" },
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
              { label: "Sala Azul", value: "Sala Azul" },
              { label: "Sala Azul", value: "Sala Azul" },
              { label: "Sala Azul", value: "Sala Azul" },
            ]}
          />
        </View>
        <View style={styles.calendarSection}>
          <Text style={styles.label}>Data</Text>
          <Pressable
            style={styles.pressableInput}
            onPress={() => setDateModalVisible(true)}
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
    padding: 10,
    marginTop: 40,
  },
  calendarSection: {
    marginTop: 20,
  },
  pressableInput: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    height: 45,
    color: "black",
    paddingRight: 30,
  },
  inputLabelWrapper: {
    flexDirection: "column",
    gap: 4,
  },
  select: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default BookingModal;
