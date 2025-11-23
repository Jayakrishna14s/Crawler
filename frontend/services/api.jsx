import axios from "axios";

export const sendMessage = async (message) => {
  return axios.post("http://localhost:5000/chat", { message });
};
