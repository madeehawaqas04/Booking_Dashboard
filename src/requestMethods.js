import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
console.log("accessToken",accessToken);

export const publicRequest = axios.create({
  baseURL: API_URL,
});

export const userRequest= axios.create({
  baseURL: API_URL,
  headers: { token: `Bearer ${accessToken}` },
});

