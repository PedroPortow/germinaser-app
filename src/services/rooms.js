import api from './api'

export const apiGetRooms = () => api.get('/rooms')

export const apiCreateRoom = async (roomData) =>
  api.post(`/rooms`, {
    room: roomData,
  })

export const apiUpdateRoom = async (roomId, roomData) =>
  api.put(`/rooms/${roomId}`, {
    room: roomData,
  })
