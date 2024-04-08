import api from './api'

export const apiGetUserData = () => api.get('/current_user')

export const apiGetAllUsers = async () => api.get('/users')

export const apiGetRoles = async () => api.get('/users/roles')

// Para atualizar um usuário
export const apiUpdateUser = async (userId, userData) =>
  api.put(`/users/${userId}`, {
    user: userData,
  })

// Para deletar um usuário
export const apiDeleteUser = async (userId) => api.delete(`/users/${userId}`)
