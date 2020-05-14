import { API_URL } from "./config";

export default {
  notFederatedLogIn(user:any) {
    return API_URL.post(`/authentication/login`, user);
  }
};
