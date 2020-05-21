import { API_URL } from "./config";

export default {
  checkoutProducts() {
    return API_URL.get(`/user/shoppingCart/checkout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getUserAddresses() {
    return API_URL.get(`/user/deliveryAddress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getPaymentDetail() {
    return API_URL.get(`/payment/paymentDetail`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  payOrder(payload: any){
    return API_URL.post(`/payment/payOrder`, payload,
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
};
