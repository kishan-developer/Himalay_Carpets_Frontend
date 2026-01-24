import axios from "axios";
import { store } from "../redux/store";
import { clearUser, setToken } from "../redux/slices/userSlice";
import authApis from "../services/api/auth/auth.apis";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1500000,
  withCredentials: true,
});

// Shared state
let isRefreshing = false;
let refreshPromise = null;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = []; 
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip if it's logout or regenerate-token request
    if (
      originalRequest.url.includes("/auth/regenerate-token") ||
      originalRequest.url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }


    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Already retried? Don't retry again
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Wait for refresh token result
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/regenerate-token`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data?.data;
        if (newToken) {
          localStorage.setItem("token", newToken);
          store.dispatch(setToken(newToken));
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        } else {
          throw new Error("No token in response");
        }
      } catch (err) {
        processQueue(err, null);
        await authApis.logOut().catch(() => { });
        store.dispatch(clearUser());
        localStorage.removeItem("token");
        reject(new Error("Session expired. Please log in again."));
      } finally {
        isRefreshing = false;
      }
    });

    return refreshPromise;
  }
);

export default axiosInstance;
