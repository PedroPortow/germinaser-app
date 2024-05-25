import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Badge, Text, FlatList, ScrollView } from 'native-base';
import moment from 'moment';
import { apiGetRoomsAvailableSlots } from '../../../../services/bookings';
import { Button, Card } from '../../../../components';

function CalendarSchedule({ selectedClinic, setIsLoading }) {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [data, setData] = useState([]);

  const fetchRoomsAvailableSlots = async () => {
    setIsLoading(true)
    const params = {
      date: selectedDate,
      clinic_id: selectedClinic,
    };
    
    try {
      setIsLoading(false)
      const response = await apiGetRoomsAvailableSlots(params);
      const formattedData = response.data.map(item => ({
        name: item.room.name,
        availableTimeSlots: item.availableTimeSlots,
      }));
      setData(formattedData);
    } catch (error) {
      setIsLoading(false)
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchRoomsAvailableSlots();
  }, [selectedDate, selectedClinic]);

  const renderItem = useCallback(({ item }) =>  (
      <Card style={styles.roomContainer}>
        <Text style={styles.roomTitle}>{item.name}</Text>
        <View style={styles.timeSlotsContainer}>
          <Text style={styles.label}>Horários disponíveis:</Text>
          <View style={styles.timeSlotsWrapper}>
            {item.availableTimeSlots.map((timeslot) => (
              <Button key={timeslot} variant='solid' colorScheme='info' style={styles.timeSlotButton}>
                <Text style={styles.badgeText}>{timeslot}</Text>
              </Button>
            ))}
          </View>
        </View>
      </Card>
    ), []);

  return (
    <CalendarProvider date={selectedDate}>
      <ExpandableCalendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        initialPosition='closed'
        allowShadow
        firstDay={1}
        minDate={new Date()}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
        theme={{
          selectedDayBackgroundColor: '#479BA7',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#479BA7',
          arrowColor: '#479BA7',
        }}
      />
      <ScrollView style={styles.marginScrollView}>
        <FlatList
          data={data || []}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    margin: 8
  }, 
  timeSlotButton: {
    width: 70
  }, 
  label: {
    fontWeight: '500',
    fontSize: 16,
  },
  marginScrollView: {
    marginBottom: 100
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
    height: 275,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    padding: 15,
    gap: 8
  },
  roomTitle: {
    fontWeight: '600',
    fontSize: 16
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CalendarSchedule;
