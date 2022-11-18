import axios from 'axios';

// create axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (config.headers) {
      // Add JWT Token
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.response.status === 401 &&
      error.response.config.url !== '/login'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    return Promise.reject(error);
  },
);

export default instance;
