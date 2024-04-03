import api from "./api";

export const apiGetDayAvailableBookings = (params) => {
  return api.get("/bookings/day_available_slots", { params });
};

export const apiCreateBooking = (params) => {
  return api.post("/bookings", {
    booking: params,
  });
};
