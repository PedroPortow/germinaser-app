import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { EXPO_API_URL } from '@env';
import events from '../events'

const api = axios.create({
  // baseURL: 'http://0.0.0.0:3000/',
  // baseURL: 'http://localhost:3000/',
  baseURL: EXPO_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken')

  console.log({token})

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
