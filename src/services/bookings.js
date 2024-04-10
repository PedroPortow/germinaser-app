import api from './api'

export const apiGetDayAvailableBookings = (params) =>
  api.get('/bookings/day_available_slots', { params })

export const apiGetBookings = ({ page = 1, perPage = 5 }) =>
  api.get('/bookings', {
    params: {
      page,
      per_page: perPage,
    },
  })

export const apiCreateBooking = (params) =>
  api.post('/bookings', {
    booking: params,
  })

export const apiDeleteBooking = (bookingId) => api.delete(`/bookings/${bookingId}`)
