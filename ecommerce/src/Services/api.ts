import axios from 'axios';
import { store } from '../redux/store';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1', // Platzi Fake Store API base
  headers: { 'Content-Type': 'application/json' },
});

// Attach token if logged in
api.interceptors.request.use((config) => {
  const state = store.getState() as any;
  const token = state.user?.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
