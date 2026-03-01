import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Your NestJS backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: You can add interceptors here later to handle global errors or auth tokens!
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Global API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;