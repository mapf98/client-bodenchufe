import Vue from "vue";
import addressService from "@/services/addressService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    addresses: [],
    verified: Boolean,
  },
  // -----------------------------------------------------------------
  getters: {
    getAddresses: (state: any) => state.addresses,
    getStatusVerified: (state: any) => state.verified,
  },
  // -----------------------------------------------------------------
  mutations: {
    setAddresses(state: any, addresses: any) {
      Vue.set(state, "addresses", addresses);
    },
    setVerifiedStatus(state: any, verified: boolean) {
      Vue.set(state, "verified", verified);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getUserAddresses: async (context: any, payload: any) => {
      const addresses = await addressService.getUserAddresses().then((res) => {
        context.commit("setAddresses", res.data.addresses);
      });
    },
    editAddress: async (context: any, payload: any) => {
      await addressService.editUserAddress(payload.userAddress).then((res) => {
        context.commit("setVerifiedStatus", res.data.verified);
      });
    },
    addAddress: async (context: any, payload: any) => {
      await addressService.addUserAddress(payload.userAddress).then((res) => {
        context.commit("setVerifiedStatus", res.data.verified);
      });
    },
    deleteAddress: async (context: any, payload: any) => {
      await addressService.deleteUserAddress(payload);
    },
    /*
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },*/
  },
};
