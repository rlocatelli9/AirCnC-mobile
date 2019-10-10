import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.107:1234'
});

export default api;
