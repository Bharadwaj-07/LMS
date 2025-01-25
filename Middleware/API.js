import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import { GLOBAL_CONFIG } from '../components/global_config';
const API = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },baseURL: 'http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Users', // Backend URL
  withCredentials: true,
});
let access_token = null;
const refreshAccessToken = async (uname) => {
  console.log("refreshing token");
    try {
      const refreshToken=await AsyncStorage.getItem('refresh_token');
      const response = await axios.post(`http://${GLOBAL_CONFIG.SYSTEM_IP}:5000/api/Users/refresh`,{uname:uname,refreshToken:refreshToken});
      const { accessToken } = response.data;
      await AsyncStorage.setItem('access_token', access_token);
      // Save the new access token to memory or sessionStorage
      return accessToken;
    } catch (error) {
      console.log("Failed to refresh token:", error);
      return null;
    }
  };
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    console.log("Token:",token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("token is there");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("error config:",error.config);
    if (error.response.status === 401 && !originalRequest._retry) {
      // If the error is due to an expired token, refresh it
      originalRequest._retry = true;
      try{
        let Uname=await   AsyncStorage.getItem('uname');
        console.log("Uname:",Uname);
      const access_token = await refreshAccessToken(Uname);
          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          return await axios(originalRequest);
        } 
        catch (refreshError) {
          // Handle refresh token failure, maybe logout the user
          console.error('Refresh token failed', refreshError);
          // You can handle logout or redirect here
        }
      }
    return Promise.reject(error);
  }
);

export default API;
