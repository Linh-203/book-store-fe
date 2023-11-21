import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://bookstore-be-h2gu.onrender.com/api',
   // withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
   }
});

export default instance;
