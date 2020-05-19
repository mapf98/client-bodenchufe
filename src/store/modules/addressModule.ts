import Vue from "vue";
import addressService from '@/services/addressService';

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    addresses: [],
  },
  // -----------------------------------------------------------------
  getters: {
    getAddresses: (state: any) => state.addresses,
  },
  // -----------------------------------------------------------------
  mutations: {
    setAddresses(state: any, addresses: any) {
      Vue.set(state, "addresses", addresses);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getUserAddresses: async (context: any, payload: any) => {
      const addresses = await addressService.getUserAddresses();
      context.commit("setAddresses", addresses.data.addresses);
    },
    /*
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },*/
  },
};
