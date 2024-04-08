import api from './api'

export const apiGetUserData = () => api.get('/current_user')

export const apiGetAllUsers = async () => api.get('/users')

export const apiGetRoles = async () => api.get('/users/roles')

export const apiCreateUser = async (userData) =>
  api.post(`/users`, {
    user: userData,
  })

export const apiUpdateUser = async (userId, userData) =>
  api.put(`/users/${userId}`, {
    user: userData,
  })

export const apiDeleteUser = async (userId) => api.delete(`/users/${userId}`)
