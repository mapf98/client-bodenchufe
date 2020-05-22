import { API_URL } from "./config";

export default {
  getCategories() {
    return API_URL.get("/category");
  },
  getProductByCategory(categoryId: number) {
    return API_URL.get(`/product/category/${categoryId}`);
  },
};
