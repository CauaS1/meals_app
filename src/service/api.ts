import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://apiIP:5500'
});