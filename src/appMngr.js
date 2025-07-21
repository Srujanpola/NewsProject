import React from 'react';
import { Server_URL } from './utils/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
class AppMngr {
  async login(email, password) {
    try {
      const response = await axios.post(`${Server_URL}login`, {
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      return { status: error.status };
    }
  }

  async signUp(username, email, password) {
    try {
      console.log('signup', username, email, password);
      const response = await axios.post(`${Server_URL}signup`, {
        username,
        email,
        password,
      });
      console.log('signup response', response);
      return response;
    } catch (error) {
      console.error('Sign up failed:', error);
      return { status: error.status };
    }
  }

  async userDetails() {
    try {
      console.log('userdetails', await AsyncStorage.getItem('email'));
      const response = await axios.post(`${Server_URL}userdetails`, {
        email: await AsyncStorage.getItem('email'),
      });
      return response;
    } catch (error) {
      console.error('User details fetch failed:', error);
      return { status: error.status };
    }
  }
}

const appMngr = new AppMngr();
export default appMngr;
