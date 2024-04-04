import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ChooseDateModal from "./components/ChooseDateModal";
import { apiGetClinicRooms, apiGetClinics } from "../../services/clinics";
import { formatDate } from "../../helpers/date";
import { apiCreateBooking } from "../../services/bookings";
import { Modal, Text, Loader } from "@components";

const BookingModal = ({ visible, onClose }) => {
  const [room, setRoom] = useState();
  const [clinic, setClinic] = useState();

  const [roomOptions, setRoomOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getClinicOptions();
  }, []);

  const getClinicOptions = async () => {
    try {
      const response = await apiGetClinics();

      const formattedResponse = response.data.map((clinic) => ({
        label: clinic.name,
        value: clinic.id,
      }));

      
      setClinicOptions(formattedResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  const getRoomOptions = async (selectedClinic) => {
    setIsLoading(true)

    try {
      const response = await apiGetClinicRooms(selectedClinic);

      const formattedResponse = response.data.map((room) => ({
        label: room.name,
        value: room.id,
      }));

      setRoomOptions(formattedResponse);
    } catch (error) {
      throw error;
    }  finally {
      setIsLoading(false)
    }
  };

  const onChooseDate = (day, timeslot) => {
    setSelectedDay(day);
    setSelectedTimeSlot(timeslot);
    setDateModalVisible(false);
  };

  const onChooseClinic = (selectedClinic) => {
    setClinic(selectedClinic);

    getRoomOptions(selectedClinic);
  };
  const onChooseRoom = (selectedRoom) => {
    setRoom(selectedRoom);
  };

  const handleCreateBooking = async () => {
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`;
      const response = await apiCreateBooking({
        start_time: startTime,
        room_id: room,
      });

      onClose();

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Reserva"
      confirmLabel="Reservar"
      onConfirm={handleCreateBooking}
    >
      <Loader loading={isLoading} />
      <ChooseDateModal
        room={room}
        onClose={() => setDateModalVisible(false)}
        visible={dateModalVisible}
        onConfirm={onChooseDate}
      />
      <View style={styles.content}>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Casa</Text>
          <RNPickerSelect
            onValueChange={onChooseClinic}
            darkTheme={true}
            value={clinic}
            style={pickerSelectStyles}
            items={clinicOptions}
          />
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Sala</Text>
          <RNPickerSelect
            onValueChange={onChooseRoom}
            value={room}
            darkTheme={true}
            style={pickerSelectStyles}
            items={roomOptions}
            disabled={!clinic}
          />
        </View>
        <View style={styles.calendarSection}>
          <Text style={styles.label}>Data</Text>
          <Pressable
            style={styles.pressableInput}
            onPress={() => setDateModalVisible(true)}
          >
            <Text>
              {selectedTimeSlot
                ? `${formatDate(selectedDay)} - ${selectedTimeSlot} `
                : "Selecione a data..."}
            </Text>
          </Pressable>
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
