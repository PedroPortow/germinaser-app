import api from "./api";

export const apiGetDayAvailableBookings = (params) => {
  return api.get("/bookings/day_available_slots", { params });
};

export const apiGetBookings = ({ page = 1, perPage = 10 }) => {
  return api.get("/bookings", {
    page,
    per_page: perPage
  });
};

export const apiCreateBooking = (params) => {
  return api.post("/bookings", {
    booking: params,
  });
};
