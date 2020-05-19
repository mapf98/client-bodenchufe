import Vue from "vue";
import checkoutService from '@/services/checkoutService';

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    paymentDetail: [],
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
      const addresses = await checkoutService.getUserAddresses();
      context.commit("setAddresses", addresses.data.addresses);
    },
    createCheckout : async () => {
      await checkoutService.checkoutProducts();
    },
    /*
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },*/
  },
};
