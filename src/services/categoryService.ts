import { API_URL } from "./config";

export default {
  getCategories() {
    return API_URL.get("/category");
  },
};
