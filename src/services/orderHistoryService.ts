import { API_URL } from "./config";

export default {
  getOrders() {
    return API_URL.get(`/user/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  rateProduct(rating: any) {
    return API_URL.post(
      `/user/product/${rating.productId}/qualification`,
      rating,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
  checkProductAlreadyRated(payload: any) {
    return API_URL.get(
      `/user/product/${payload.product_id}/checkQualification`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};
