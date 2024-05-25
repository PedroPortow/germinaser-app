import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Badge, Text, FlatList, ScrollView } from 'native-base';
import moment from 'moment';
import { apiGetRoomsAvailableSlots } from '../../../../services/bookings';

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

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.hourlyItemWrapper}>
        <View style={styles.hourContainer}>
          <Text style={styles.hourText}>{item.name}</Text>
        </View>
        <View style={styles.hourRightContent}>
          <Text style={styles.label}>Horários disponíveis:</Text>
          <View style={styles.timeSlotsWrapper}>
            {item.availableTimeSlots.map((timeslot) => (
              <Badge key={timeslot} variant='solid' colorScheme='info'>
                <Text style={styles.badgeText}>{timeslot}</Text>
              </Badge>
            ))}
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <CalendarProvider date={selectedDate}>
      <ExpandableCalendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        initialPosition='closed'
        allowShadow
        firstDay={1}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      <ScrollView>
        <FlatList
          data={data || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '500',
    fontSize: 16,
  },
  hourContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  timeSlotsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 300,
    gap: 10,
    marginTop: 8,
  },
  hourRightContent: {
    paddingTop: 4,
  },
  hourlyItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
  },
  hourText: {
    fontWeight: '600',
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CalendarSchedule;
