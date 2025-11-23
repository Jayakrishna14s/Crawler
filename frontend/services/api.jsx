import axios from "axios";

export const sendMessage = async (message, history) => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  return axios.post(`${URL}/chat`, { message, history });
};
