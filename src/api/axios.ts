import axios from 'axios';
import { LocalStorageKey } from 'constants/localStorage';
// import { LocalStorageKey } from 'constants/localStorage';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 50000,
});

axiosInstance.defaults.headers.common['x-csrf-token'] = 'AUTH_TOKEN';

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Authorization'] = `${localStorage?.getItem(
        LocalStorageKey.TOKEN_TYPE,
      )} ${localStorage?.getItem(LocalStorageKey.ACCESS_TOKEN)}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const service = axiosInstance;

export default service;
