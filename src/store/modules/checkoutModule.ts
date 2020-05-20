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
    getPaymentDetail: (state: any) => state.paymentDetail,
  },
  // -----------------------------------------------------------------
  mutations: {
    setPaymentDetail(state: any, paymentDetail: any) {
      Vue.set(state, "paymentDetail", paymentDetail);
    },
  }, 
  // -----------------------------------------------------------------
  actions: {
    createCheckout : async () => {
      await checkoutService.checkoutProducts();
    },
    getPaymentDetail: async (contex: any) => {
      const paymentDetail = await checkoutService.getPaymentDetail();
      contex.commit("setPaymentDetail", paymentDetail.data)
    },
  },
};
