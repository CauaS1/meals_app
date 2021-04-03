import { COMPUTER_API } from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: COMPUTER_API
});