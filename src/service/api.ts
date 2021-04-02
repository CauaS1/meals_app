import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://apiIP.10:5500'
});