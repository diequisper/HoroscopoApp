import axios from "axios";

export const NestBack = axios.create({
  baseURL : 'http://192.168.1.36:3000/api'
})