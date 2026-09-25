import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized request");
      } else if (status === 404) {
        console.error("Resource not found");
      } else if (status >= 500) {
        console.error("Server error");
      }
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request setup error");
    }

    return Promise.reject(error);
  }
);

export default api;