import { API_URL } from "./config";
import axios from "axios";

export default {
  getUserById() {
    return API_URL.get(`/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
