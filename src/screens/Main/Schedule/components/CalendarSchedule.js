import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text, FlatList, ScrollView } from 'native-base';
import { apiGetRoomsAvailableSlots } from '../../../../services/bookings';
import { Button, Card, CreateBookingModal } from '../../../../components';
import { useFullScreenModal } from '../../../../context/FullScreenModalContext';

const CalendarSchedule = React.memo(({ selectedClinic, setIsLoading, selectedDate, onCreateBooking }) => {
  const [roomsTimeSlots, setRoomTimeSlots] = useState([]);

  const { showModal, hideModal } = useFullScreenModal();

  const fetchRoomsAvailableSlots = useCallback(async () => {
    setIsLoading(true);
    const params = {
      date: selectedDate,
      clinic_id: selectedClinic,
    };

    try {
      const response = await apiGetRoomsAvailableSlots(params);
      const formattedData = response.data.map(item => ({
        room: {
          id: item.room.id,
          name: item.room.name,
        },
        availableTimeSlots: item.availableTimeSlots,
      }));
      setRoomTimeSlots(formattedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to fetch roomsTimeSlots', error);
    }
  }, [selectedDate, selectedClinic, setIsLoading]);

  useEffect(() => {
    fetchRoomsAvailableSlots();
  }, [selectedDate, selectedClinic, fetchRoomsAvailableSlots]);

  const handleSelectTimeSlot = useCallback((selectedTimeSlot, item) => {
    showModal({
      title: "Nova Reserva",
      children: (
        <CreateBookingModal
          onClose={hideModal}
          onCreate={() => {
            fetchRoomsAvailableSlots()
            onCreateBooking()
          }}
          selectedClinic={selectedClinic}
          selectedDay={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          selectedRoom={item.room.id}
        />
      ),
    });
  }, [selectedClinic, selectedDate, showModal, hideModal]);

  const renderItem = useCallback(({ item }) => (
    <Card style={styles.roomContainer}>
      <Text style={styles.roomTitle}>{item.room.name}</Text>
      <View style={styles.timeSlotsContainer}>
        <Text style={styles.label}>Horários disponíveis:</Text>
        <View style={styles.timeSlotsWrapper}>
          {item.availableTimeSlots.map((timeSlot) => (
            <Button
              key={`${timeSlot}-${item.room.id}`}
              ariant='solid'
              colorScheme='info'
              onPress={() => handleSelectTimeSlot(timeSlot, item)}
              style={styles.timeSlotButton}
            >
              <Text style={styles.badgeText}>{timeSlot}</Text>
            </Button>
          ))}
        </View>
      </View>
    </Card>
  ), [handleSelectTimeSlot]);

  return (
    <ScrollView>
      <FlatList
        data={roomsTimeSlots}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.room.id.toString()}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  listContainer: {
    margin: 8,
    paddingBottom: 100,
  },
  timeSlotButton: {
    width: 78,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
  },
  marginScrollView: {
    marginBottom: 100,
  },
  timeSlotsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  timeSlotsContainer: {
    paddingTop: 4,
  },
  roomContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    padding: 15,
    gap: 8,
  },
  roomTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CalendarSchedule;
