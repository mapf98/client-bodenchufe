import { API_URL } from "./config";

export default {
  getUserById() {
    return API_URL.get(`/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateUserInfo(user: any) {
    return API_URL.put(`/user`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  changePassword(userPasswordData: any) {
    return API_URL.patch(`user/changePassword`, userPasswordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
