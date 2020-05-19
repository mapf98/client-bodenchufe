import { API_URL } from "./config";

export default {
  getUserCouponsForOrder (orderTotal: number) {
    return API_URL.get(`/user/order/coupon/${orderTotal}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
}