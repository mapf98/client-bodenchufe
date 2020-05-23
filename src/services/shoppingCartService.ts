import { API_URL } from "./config";
import axios from "axios";

export default {
  getShoppingCart() {
    return API_URL.get(`/user/shoppingCart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  deleteProduct(productId: any) {
    return API_URL.delete(`/user/shoppingCart/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateQuantity(productId: number, quantity: any) {
    return API_URL.patch(`/user/shoppingCart/${productId}/quantity`, quantity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateProductStatus(productId: any, status: any) {
    return API_URL.patch(`/user/shoppingCart/${productId}/status`, status, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  addProduct(postId: any, quantity: any) {
    return API_URL.post(
      `/user/shoppingCart`,
      {
        fk_product_provider_id: postId,
        product_provider_order_quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};
