import axios from 'axios';
import qs from 'qs';
import router from '../router';

const baseURL = 'http://localhost:3000';

const Axios = axios.create({
  baseURL,
  timeout: 60000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头请求格式为json
    'Access-Control-Allow-Origin': baseURL,
  },
});

Axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // eslint-disable-next-line no-param-reassign
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => Promise.reject(error));
Axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return Promise.resolve(res);
  }
  router.push({
    name: 'error',
    params: {
      err: res.data,
    },
  });
  return res;
}, (error) => {
  router.push({
    name: 'error',
    params: {
      err: error,
    },
  });
});

export default Axios;
