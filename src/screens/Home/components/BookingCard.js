import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Garanta que você tenha @expo/vector-icons instalado
import Text from '../../../components/Text/Text';

function BookingCard({ booking, icon }) {
  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={24} style={styles.icon} />}
      <View style={styles.textContent}>
        <Text style={styles.text}>{booking.room}</Text>
        <Text style={styles.subtext}>{booking.house}</Text>
      </View>
      <View style={styles.rightTextContext}>
        <Text style={styles.text}>{booking.week_day}, {booking.date} </Text>
        <Text style={styles.text}> {booking.starting_time} - {booking.ending_time} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Cor de fundo do card
    padding: 16, // Espaçamento interno
    flexDirection: 'row', // Itens alinhados horizontalmente
    alignItems: 'center', // Alinha itens verticalmente ao centro
    borderRadius: 10, // Borda arredondada
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Direção e distância da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 2, // Suavização da sombra
    elevation: 5, // Elevação para Android
    marginVertical: 8, // Margem vertical para separação entre cards
  },
  textContent: {
    flex: 1, // Faz com que o conteúdo de texto ocupe o espaço disponível
  },
  rightTextContext: {
    alignItems: "flex-end",
    flex: 1,
  },
  text: {
    fontSize: 16, // Tamanho do texto
    fontWeight: 'bold', // Peso da fonte
    color: '#333', // Cor do texto
  },
  subtext: {
    fontSize: 14, // Tamanho do subtexto
    color: '#666', // Cor do subtexto
  },
  icon: {
    marginRight: 10, // Margem à direita do ícone
  },
});

export default BookingCard;
