import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import { Badge, Text } from 'native-base';
import { apiGetWeekAvailableslots } from '../../../../services/bookings';
import moment from 'moment';

function WeekSchedule({ selectedClinic = 1 }) {
  const [selectedDate, setSelectedDate] = useState('2024-05-20');
  const [weekStartDate, setWeekStartDate] = useState(moment('2024-05-20').startOf('week').format('YYYY-MM-DD'));
  const [data, setData] = useState({});

  const fetchWeekData = async (date, clinicId) => {
    const params = {
      date,
      clinic_id: clinicId,
    };

    try {
      const response = await apiGetWeekAvailableslots(params);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchWeekData(weekStartDate, selectedClinic);
  }, [weekStartDate, selectedClinic]);

  useEffect(() => {
    const newWeekStartDate = moment(selectedDate).startOf('week').format('YYYY-MM-DD');
    if (newWeekStartDate !== weekStartDate) {
      setWeekStartDate(newWeekStartDate);
    }
  }, [selectedDate, weekStartDate]);

  const generateAgendaItems = () => {
    const items = {};

    for (const [date, rooms] of Object.entries(data)) {
      items[date] = rooms;
    }

    return Object.entries(items).map(([title, data]) => ({ title, data }));
  };

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
              <Badge key={timeslot} variant={'solid'} colorScheme={'info'}>
                <Text style={styles.badgeText}>{timeslot}</Text>
              </Badge>
            ))}
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <CalendarProvider date={selectedDate} >
      <WeekCalendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        firstDay={1}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      <AgendaList sections={generateAgendaItems()} renderItem={renderItem}

      />
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
  badge: {
    margin: 5,
  },
});

export default WeekSchedule;
