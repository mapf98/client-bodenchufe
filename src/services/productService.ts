import { API_URL } from "./config";

export default {
  getProductByCategory(categoryId: number) {
    return API_URL.get(`/product/category/${categoryId}`);
  },
  getProductDetail(postId: number){
    return API_URL.get(`/product/${postId}`);
  }
};
