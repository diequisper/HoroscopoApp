import axios from "axios";

export const NestBack = axios.create({
  baseURL : 'http://:3000/api'
})