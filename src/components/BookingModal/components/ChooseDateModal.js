import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Text, Modal } from "@components";
import { Calendar } from "react-native-calendars";

function ChooseDateModal({ room, onClose }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const fetchAvailableTimeSlots = (day) => {
    console.log({ day });
    setAvailableTimeSlots(timeSlots);
  };

  const onSelectDay = (day) => {
    setSelectedDay(day.dateString);
    fetchAvailableTimeSlots(day);
  };

  return (
    <Modal
      visible={true}
      onClose={onClose}
      title="Data da Reserva"
      closeIcon="chevron-back-outline"
      onConfirm={() => console.log("oi")}
      subtitle="Você possui 2 créditos de reserva disponíveis"
    >
      <View style={styles.content}>
        <Text style={styles.roomText}> {room} </Text>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#479BA7",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#479BA7",
            dayTextColor: "#2d4150",
            arrowColor: "#479BA7",
          }}
          onDayPress={onSelectDay}
          markedDates={{ [selectedDay]: { selected: true } }}
        />
        {selectedDay && availableTimeSlots.length ? (
          <View style={styles.timeSlotsWrapper}>
            <Text style={styles.timeSlotsText}>Horários disponíveis:</Text>
            <ScrollView
              contentContainerStyle={styles.timeSlotsContainer}
              style={{ maxHeight: 500 }}
            >
              {selectedDay &&
                timeSlots.map((slot, index) => (
                  <Pressable
                    key={index}
                    style={
                      selectedTimeSlot == slot
                        ? styles.selectedTimeSlotButton
                        : styles.timeSlotButton
                    }
                    onPress={() => setSelectedTimeSlot(slot)}
                  >
                    <Text style={styles.btnText}>{slot}</Text>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        ) : null}
        {/* <Pressable styles={styles.pres} */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  timeSlotsWrapper: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 22,
  },
  content: {
    marginTop: 16,
  },
  timeSlotsText: {
    fontWeight: "semibold",
    fontSize: 22,
  },
  roomText: {
    fontSize: 22,
    textAlign: "center",
  },
  timeSlotButton: {
    backgroundColor: "#61b1bc",
    padding: 12,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  btnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedTimeSlotButton: {
    backgroundColor: "#61b1bc",
    padding: 12,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  timeSlotsContainer: {},
});

export default ChooseDateModal;
