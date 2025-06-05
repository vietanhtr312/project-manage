import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const state = localStorage.getItem('user');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mjc0YmY1MWZjNjdhZDQzOTdiY2M1MSIsImlhdCI6MTc0NzYxODA4NCwiZXhwIjoxNzUwMjEwMDg0fQ.ENtt_NTjA0wdhCe0I5EMHIUdL0j3Rzw6cb550L0n48M";

const axiosClient = axios.create({
  baseURL: `${backendUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export default axiosClient;
