import { API_URL } from "./config";
import axios from 'axios';

export default {
  checkoutProducts (){
    return axios.patch(`/user/shoppingCart/checkout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getUserAddresses () {
    return API_URL.get(`/user/deliveryAddress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
}