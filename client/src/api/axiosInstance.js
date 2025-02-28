import axios from 'axios';

// Create an Axios instance with base URL
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true // Ensure credentials are sent with requests
});

// Add a request interceptor to include CSRF token in headers
api.interceptors.request.use(
  config => {
    const csrfToken = getCookie('csrftoken'); // Function to retrieve CSRF token from cookie
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Function to retrieve CSRF token from cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
