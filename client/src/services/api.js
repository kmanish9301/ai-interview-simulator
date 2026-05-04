import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const startInterview = async (role) => {
  const response = await api.post('/interview/start', { role });
  return response.data;
};

export const submitInterview = async (sessionId, answers) => {
  const response = await api.post('/interview/submit', { sessionId, answers });
  return response.data;
};

export const getResult = async (sessionId) => {
  const response = await api.get(`/interview/${sessionId}/result`);
  return response.data;
};

export default api;
