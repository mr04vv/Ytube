import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'http://35.197.75.96:3000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
});

export default client;
