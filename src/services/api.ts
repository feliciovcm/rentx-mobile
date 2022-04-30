import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.25.0.1:3000'
});
