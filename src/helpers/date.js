export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() retorna um índice baseado em zero, então adicionamos 1.
  const year = date.getFullYear().toString().substring(2); // Pega apenas os dois últimos dígitos do ano

  return `${day}/${month}/${year}`;
}

export function getWeekDay(dateString) {
  const date = new Date(dateString);
  const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return weekDays[date.getDay()];
}

