import api from './api'

// USER
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

export const apiCancelBooking = (bookingId) => api.post(`/bookings/${bookingId}/cancel`)

// ADMIN
export const apiUpdateBookingAsAdmin = (bookingId, bookingData) =>
  api.put(`/admin/bookings/${bookingId}`, {
    booking: bookingData,
  })

export const apiCancelBookingAsAdmin = (bookingId) =>
  api.post(`/admin/bookings/${bookingId}/cancel`)

export const apiGetAllUsersBookings = ({ page = 1, perPage = 5, userId, clinicId }) =>
  api.get('/admin/bookings', {
    params: {
      page,
      per_page: perPage,
      user_id: userId,
      clinic_id: clinicId,
    },
  })
