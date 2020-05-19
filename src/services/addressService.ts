import { API_URL } from "./config";

export default {
  getUserAddresses () {
    return API_URL.get(`/user/deliveryAddress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
}