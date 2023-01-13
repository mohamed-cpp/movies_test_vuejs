/* eslint-disable prettier/prettier */
import router from "../router/index";
import { getToken, isLogged, removeToken } from "./auth";

import axios from 'axios';
const service = axios.create({
  baseURL: 'https://test-api.storexweb.com',
});

service.interceptors.request.use((config) => {
  const token = isLogged();
  // config.headers["Content-Type"] = "application/json";
  if (token) {
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  return config;
});

service.interceptors.request.use(function (config) {
  // if(config?.permission && !rules.includes(config?.permission)){
  //   throw new axios.Cancel('403');
  // }
  return config;
});


// response pre-processing
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let errorMessage = error.response.data.message;
    if (error.response.status === 404 && !errorMessage) {
      router.push("/404");
    }
    if (error.response.status === 401 && error.response.data.message == 'Unauthenticated.' ) {
      removeToken()
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default service;
