import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const state = localStorage.getItem('user');
const token = state ? JSON.parse(state).state.token : null;

const axiosClient = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export default axiosClient;
