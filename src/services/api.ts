import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.buscafarm.com',
});

export default api;
