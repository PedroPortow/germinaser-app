import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { EXPO_API_URL } from '@env';
import events from '../events'

const api = axios.create({
   baseURL: EXPO_API_URL,
  // baseURL: 'http://localhost:3000/',

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken')

  if (token) {
    config.headers.Authorization = token
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      events.emit('logout')
    }
    return Promise.reject(error)
  }
)

export default api
