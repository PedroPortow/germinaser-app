import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("userToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
