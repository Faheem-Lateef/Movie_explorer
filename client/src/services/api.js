import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const MoviesAPI = {
  search: (q) => api.get('/movies/search', { params: { q } }),
  details: (id) => api.get(`/movies/${id}`),
};

export const FavoritesAPI = {
  list: () => api.get('/favorites'),
  add: (payload) => api.post('/favorites', payload),
  remove: (id) => api.delete(`/favorites/${id}`),
};

export default api;
