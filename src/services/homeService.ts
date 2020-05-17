import { API_URL } from "./config";

export default {
  getMainProviders() {
    return API_URL.get("/provider/main");
  },
};
