import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export default axiosClient;
