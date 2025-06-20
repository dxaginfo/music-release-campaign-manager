import axios from 'axios';

const API_URL = '/api/auth';

// Check if user is authenticated
const checkAuthStatus = async () => {
  const response = await axios.get(`${API_URL}/status`);
  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }
  return response.data.user;
};

// Register new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  }
  return response.data.user;
};

// Logout user
const logout = async () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return true;
};

const authService = {
  checkAuthStatus,
  login,
  register,
  logout,
};

export default authService;
