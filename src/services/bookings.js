import api from './api'

// USER
export const apiGetDayAvailableBookings = (params) =>
  api.get('/bookings/day_available_slots', { params })

export const apiGetBookings = (params) =>
  api.get('/bookings', {
    params
  })

export const apiCreateBooking = (params) =>
  api.post('/bookings', {
    booking: params,
  })

export const apiGetWeekAvailableslots = (params) => (
  api.get('/bookings/week_available_slots', { params })
)

export const apiCancelBooking = (bookingId) => api.post(`/bookings/${bookingId}/cancel`)

// ADMIN
export const apiUpdateBookingAsAdmin = (bookingId, bookingData) =>
  api.put(`/admin/bookings/${bookingId}`, {
    booking: bookingData,
  })

export const apiCancelBookingAsAdmin = (bookingId) =>
  api.post(`/admin/bookings/${bookingId}/cancel`)

export const apiGetAllUsersBookings = (params) =>
  api.get('/admin/bookings', {
    params
  })
  
