import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., "https://ai-chat-bot-5.onrender.com/api/v1"
  withCredentials: true,                 // sends cookies automatically
});

export default api;
