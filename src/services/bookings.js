import api from "./api";

export const apiGetDayAvailableBookings = (params) => {
  return api.get("/bookings/day_available_slots", { params });
};

export const apiGetBookings = ({ page = 1, perPage = 5 }) => {
  return api.get("/bookings", {
    params: {
      page,
      per_page: perPage
    }
  });
};


export const apiCreateBooking = (params) => {
  return api.post("/bookings", {
    booking: params,
  });
};
