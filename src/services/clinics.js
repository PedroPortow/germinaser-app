import api from './api'

export const apiGetClinics = () => api.get('/clinics')

export const apiCreateClinic = async (clinicData) =>
  api.post(`/clinics`, {
    clinic: clinicData,
  })

export const apiUpdateClinic = async (clinicId, clinicData) =>
  api.put(`/clinics/${clinicId}`, {
    clinic: clinicData,
  })

export const apiGetClinicRooms = (clinicId) => api.get(`/clinics/${clinicId}/rooms`)
