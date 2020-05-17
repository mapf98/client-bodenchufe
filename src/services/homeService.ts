import { API_URL } from "./config";

export default {
  getMainProviders() {
    return API_URL.get("/provider/main");
  },
  getMainCategories() {
    return API_URL.get("/category/main");
  },
  getOffers() {
    return API_URL.get("/offer");
  },
};
