import axios from 'axios';

const PERSIST_KEY = 'temudark_state';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    const state = raw ? JSON.parse(raw) : null;
    const token = state?.user?.user?.token;
    if (token) {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
  } catch {
    // ignore
  }
  return config;
});

export default api;
