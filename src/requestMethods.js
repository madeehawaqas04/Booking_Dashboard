import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
// console.log("accessToken_RM",accessToken);

export const publicRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  // headers: { token: `Bearer ${accessToken}` },
});

