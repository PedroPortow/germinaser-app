import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import ChooseDateModal from "./components/ChooseDateModal";
import { apiGetClinicRooms, apiGetClinics } from "../../services/clinics";
import { formatDate } from "../../helpers/date";
import { apiCreateBooking } from "../../services/bookings";
import { Modal, Text, Loader, Card } from "@components";
import { Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const CreateBookingModal = ({ visible, onClose, onCreate }) => {
  const [clinic, setClinic] = useState();
  const [room, setRoom] = useState();

  // ui-kitten
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(null);

  const [roomOptions, setRoomOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);

  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [selectedDay, setSelectedDay] = useState("20");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  };

  const resetStates = () => {
    setRoom(null);
    setClinic(null);
    setSelectedDay(null);
    setSelectedTimeSlot(null);

    // ui-kitten
    setSelectedClinicIndex(null);
    setSelectedRoomIndex(null);
  };

  useEffect(() => {
    if (!visible) {
      resetStates();
      return;
    }
  }, [visible]);

  const getRoomOptions = async (selectedClinic) => {
    setIsLoading(true);

    try {
      const response = await apiGetClinicRooms(selectedClinic);

      const formattedResponse = response.data.map((room) => ({
        label: room.name,
        value: room.id,
      }));

      setRoomOptions(formattedResponse);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onChooseDate = (day, timeslot) => {
    setSelectedDay(day);
    setSelectedTimeSlot(timeslot);
    setDateModalVisible(false);
  };

  const onChooseClinic = (selectedClinic) => {
    const selectedClinicId = clinicOptions[selectedClinic.row].value;
    setClinic(selectedClinicId);
    setSelectedClinicIndex(selectedClinic);

    getRoomOptions(selectedClinic);
  };
  const onChooseRoom = (selectedRoom) => {
    const selectedRoomId = roomOptions[selectedRoom.row].value;
    setSelectedRoomIndex(selectedRoom);
    setRoom(selectedRoomId);
  };

  const handleCreateBooking = async () => {
    try {
      const startTime = `${selectedDay}T${selectedTimeSlot}:00Z`;
      const response = await apiCreateBooking({
        start_time: startTime,
        room_id: room,
      });

      // onCreate()
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
      theme="primary"
      buttonLabel="Reservar"
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
            <Select
              onSelect={onChooseClinic}
              value={clinicOptions[selectedClinicIndex?.row]?.label}
              placeholder="Seleciona a casa"
            >
              {clinicOptions.map((clinic) => (
                <SelectItem key={clinic.value} title={clinic.label} />
              ))}
            </Select>
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Sala</Text>
        
            <Select
              onSelect={onChooseRoom}
              value={roomOptions[selectedRoomIndex?.row]?.label}
              disabled={!clinic}
              placeholder="Seleciona a sala"
            >
              {roomOptions.map((room) => (
                <SelectItem key={room.value} title={room.label} />
              ))}
            </Select>
        </View>
        <View style={styles.inputLabelWrapper}>
          <Text style={styles.label}>Data</Text>
          <Pressable
            style={styles.pressableInput}
            onPress={() => setDateModalVisible(true)}
            disabled={!room}
          >
            {selectedTimeSlot 
              ?  <Text style={styles.selectedTimeText}>{formatDate(selectedDay)} - {selectedTimeSlot}</Text>
              :   <Text style={styles.placeholder}>Selecione a data</Text>
            }
          
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
  selectedTimeText: {
    color: '#222B45',
    fontWeight: 'bold',
    fontSize: 15
  },
  placeholder: {
    color: '#C5CCD9',
    fontWeight: 'semibold',
    fontSize: 15
  },
  pressableInput: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E4E9F2",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#F7F9FC"
  },
  iconTextWrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'

  },
  selectedBookingText: {
    fontWeight: 'semibold',
    fontSize: 16
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

export default CreateBookingModal;
