import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Pressable } from 'react-native'
import { Text, Modal } from '@components'
import { Calendar } from 'react-native-calendars';

function ChooseDateModal({ room }) {
    // Estado para o dia selecionado
    const [selectedDay, setSelectedDay] = useState('');

    // Exemplo de horários disponíveis (isso pode vir de uma API)
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  
    // Função para manipular a seleção de um dia no calendário
    const onDaySelect = (day) => {
      setSelectedDay(day.dateString);
    };

  return (
    <Modal
      visible={true}
      onClose={() => console.log("clicou")}
      title="Selecione Dat"
      closeIcon="chevron-back-outline"
      subtitle="Você possui 2 créditos de reserva disponíveis"
    >
    <Text style={styles.roomText}> {room} </Text>
    <Calendar
      style={styles.calendar}
      onDayPress={onDaySelect}
      markedDates={{ [selectedDay]: { selected: true } }}
    />
     <View style={styles.timeSlotsWrapper}>
        <ScrollView>
          {selectedDay && timeSlots.map((time, index) => (
            <Pressable key={index} style={styles.timeSlotButton} onPress={() => console.log(`${time} selected`)}>
              <Text>{time}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {/* <Pressable styles={styles.pres} */}
    </Modal>
  )
}

const styles = StyleSheet.create({
  timeSlotsWrapper: {
    backgroundColor: "white",
    padding: 10
  },
  calendar: {
    // Estilize conforme necessário
  },
  roomText: {
    fontSize: 22,
    textAlign: 'center'
  },
  timeSlotButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    width: 100,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: 'center',
  }
});

export default ChooseDateModal