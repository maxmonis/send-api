import axios from 'axios';

const client = axios.create({
  baseURL: process.env.backendURL,
});

export default client;
