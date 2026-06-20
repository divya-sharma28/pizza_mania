import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/pizza-mania`,
  withCredentials: true, // to send cookies with requests
});
