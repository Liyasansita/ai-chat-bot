// import axios from "axios";
// export const loginUser = async (email: string, password: string) => {
//   const res = await axios.post("/user/login", { email, password });
//   if (res.status !== 200) {
//     throw new Error("Unable to login");
//   }
//   const data = await res.data;
//   return data;
// };

// export const signupUser = async (
//   name: string,
//   email: string,
//   password: string
// ) => {
//   const res = await axios.post("/user/signup", { name, email, password });
//   if (res.status !== 201) {
//     throw new Error("Unable to Signup");
//   }
//   const data = await res.data;
//   return data;
// };

// export const checkAuthStatus = async () => {
//   const res = await axios.get("/user/auth-status");
//   if (res.status !== 200) {
//     throw new Error("Unable to authenticate");
//   }
//   const data = await res.data;
//   return data;
// };

// export const sendChatRequest = async (message: string) => {
//   const token = localStorage.getItem("token"); // or get from cookie if you stored it there
//   const res = await axios.post(
//     "/chat/new",
//     { message },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (res.status !== 200) {
//     throw new Error("Unable to send chat");
//   }
//   return res.data;
// };


// export const getUserChats = async () => {
//   const res = await axios.get("/chat/all-chats");
//   if (res.status !== 200) {
//     throw new Error("Unable to send chat");
//   }
//   const data = await res.data;
//   return data;
// };

// export const deleteUserChats = async () => {
//   const res = await axios.delete("/chat/delete");
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };

// export const logoutUser = async () => {
//   const res = await axios.get("/user/logout");
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };
import axios from "axios";

// create axios instance with cookies enabled
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., "https://ai-chat-bot-5.onrender.com/api/v1"
  withCredentials: true,                 // send cookies automatically
});

// LOGIN
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) throw new Error("Unable to login");
  return res.data;
};

// SIGNUP
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 201) throw new Error("Unable to Signup");
  return res.data;
};

// CHECK AUTH
export const checkAuthStatus = async () => {
  const res = await api.get("/user/auth-status");
  if (res.status !== 200) throw new Error("Unable to authenticate");
  return res.data;
};

// SEND CHAT
export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat/new", { message });
  if (res.status !== 200) throw new Error("Unable to send chat");
  return res.data;
};

// GET USER CHATS
export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) throw new Error("Unable to get chats");
  return res.data;
};

// DELETE USER CHATS
export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  if (res.status !== 200) throw new Error("Unable to delete chats");
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  if (res.status !== 200) throw new Error("Unable to logout");
  return res.data;
};

