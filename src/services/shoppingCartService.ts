import { API_URL_TOKEN } from "./config";

export default {
  getShoppingCart() {
    return API_URL_TOKEN.get(`/user/shoppingCart`);
  },
  deleteProduct(productId: any) {
    return API_URL_TOKEN.delete(`/user/shoppingCart/${productId}`);
  },
  updateQuantity(productId: number, quantity: any) {
    return API_URL_TOKEN.patch(
      `/user/shoppingCart/${productId}/quantity`,
      quantity
    );
  },
  updateProductStatus(productId: any, status: any) {
    return API_URL_TOKEN.patch(
      `/user/shoppingCart/${productId}/status`,
      status
    );
  },
};
