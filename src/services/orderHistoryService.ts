import { API_URL } from "./config";

export default {
  getOrders() {
    return API_URL.get(`/user/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getDiscount(){
    return API_URL.get(`/product/:productProviderId/discount`)
  }
};
