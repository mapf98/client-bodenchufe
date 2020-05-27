import { API_URL } from "./config";

export default {
  getProductByCategory(categoryId: number) {
    return API_URL.get(`/product/category/${categoryId}`);
  },
  getProductByProvider(providerId: number) {
    return API_URL.get(`/product/provider/${providerId}`);
  },
  getProductByOffer(offerId: number) {
    return API_URL.get(`/product/offer/${offerId}`);
  },
  getProductDetail(postId: number) {
    return API_URL.get(`/product/${postId}`);
  },
  getProductByKeyword(keyword: string) {
    return API_URL.get(`/product/search/${keyword}`);
  },
};
