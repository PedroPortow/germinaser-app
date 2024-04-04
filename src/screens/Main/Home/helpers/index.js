import moment from 'moment'

export const getBookingEndtimeFormatted = (startHour) => {
  const startTime = moment().set({
    hour: moment(startHour,"HH:mm").get('hour'),
    minute: moment(startHour, "HH:mm").get('minute')
  });

  const formattedStartTime = startTime.format('HH:mm');
  
  // Calculando a hora de término adicionando 1 hora
  const endTime = moment(startTime).add(1, 'hours');
  const formattedEndTime = endTime.format('HH:mm');
  return formattedEndTime
}