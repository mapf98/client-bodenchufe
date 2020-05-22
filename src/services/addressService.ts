import { API_URL } from "./config";

export default {
  getUserAddresses() {
    return API_URL.get(`/user/deliveryAddress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  editUserAddress(userAddress: any) {
    return API_URL.put(
      `/user/deliveryAddress/${userAddress.delivery_address_id}`,
      userAddress,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
  addUserAddress(userAddress: any) {
    return API_URL.post(`/user/deliveryAddress`, userAddress, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  deleteUserAddress(body: any) {
    return API_URL.patch(
      `/user/deliveryAddress/${body.deliveryAddressId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};
