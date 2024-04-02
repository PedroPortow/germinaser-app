import api from "./api";

export const apiGetDayAvailableBookings = (date, roomId) => {
  return api.get(`/bookings/day_available_slots`, {
    params: {
      date: date,
      room_id: roomId,
    },
  });
};
