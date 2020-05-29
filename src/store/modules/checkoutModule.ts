import Vue from "vue";
import checkoutService from "@/services/checkoutService";

export default {
  namespaced: true,
  state: {
    paymentDetail: [],
    urlPaymentGateway: {},
  },
  getters: {
    getPaymentDetail: (state: any) => state.paymentDetail,
    getUrlPaymentGateway: (state: any) => state.urlPaymentGateway,
  },
  mutations: {
    setPaymentDetail(state: any, paymentDetail: any) {
      Vue.set(state, "paymentDetail", paymentDetail);
    },
    setPaymentUrl(state: any, urlPaymentGateway: any) {
      Vue.set(state, "urlPaymentGateway", urlPaymentGateway);
    },
  },
  actions: {
    createCheckout: async () => {
      await checkoutService.checkoutProducts();
    },
    getPaymentDetail: async (contex: any) => {
      const paymentDetail = await checkoutService.getPaymentDetail();
      contex.commit("setPaymentDetail", paymentDetail.data);
    },
    payOrder: async (contex: any, payload: any) => {
      const urlPaymentGateway = await checkoutService.payOrder(payload);
      contex.commit(
        "setPaymentUrl",
        urlPaymentGateway.data.paymentUrl.data.attributes.redirect_url
      );
    },
  },
};
