import axios from 'axios';

const hololingoApi = axios.create({
  baseURL: '/api',
});

export default hololingoApi;
