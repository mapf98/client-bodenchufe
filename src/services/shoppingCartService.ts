import axios from "axios";

export default {
  getShoppingCart() {
    return axios.get(`/user/shoppingCart`, {
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 10000,
    });
  },
  deleteProduct(productId: any) {
    return axios.delete(`/user/shoppingCart/${productId}`, {
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 10000,
    });
  },
  updateQuantity(productId: number, quantity: any) {
    return axios.patch(`/user/shoppingCart/${productId}/quantity`, quantity, {
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 10000,
    });
  },
  updateProductStatus(productId: any, status: any) {
    return axios.patch(`/user/shoppingCart/${productId}/status`, status, {
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 10000,
    });
  },
};
