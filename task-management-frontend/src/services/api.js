import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/login`, credentials);
};

export const getTasks = async (token) => {
  return await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (taskData, token) => {
  return await axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (taskId, taskData, token) => {
  return await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId, token) => {
  return await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
