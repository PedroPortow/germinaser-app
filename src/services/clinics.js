import api from "./api";

export const apiGetClinics = () => api.get("/clinics");

export const apiGetClinicRooms = (clinicId) =>
  api.get(`/clinics/${clinicId}/rooms`);
