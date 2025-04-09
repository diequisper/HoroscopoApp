import axios from "axios";
import {BACKEND_URL} from "@env"

export const NestBack = axios.create({
  baseURL : BACKEND_URL
})