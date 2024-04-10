import moment from 'moment'

export function formatDate(dateString) {
  const date = new Date(dateString)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // getMonth() retorna um índice baseado em zero, então adicionamos 1.
  const year = date.getUTCFullYear().toString().substring(2) // Pega apenas os dois últimos dígitos do ano

  return `${day}/${month}/${year}`
}

export function getWeekDay(dateString) {
  const date = new Date(dateString)
  const weekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ]
  return weekDays[date.getDay()]
}

export const getBookingEndtimeFormatted = (startHour) => {
  const startTime = moment().set({
    hour: moment(startHour, 'HH:mm').get('hour'),
    minute: moment(startHour, 'HH:mm').get('minute'),
  })

  const endTime = moment(startTime).add(1, 'hours')
  const formattedEndTime = endTime.format('HH:mm')
  return formattedEndTime
}
