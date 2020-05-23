import Vue from "vue";
import couponService from "@/services/couponService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    orderCoupons: [],
  },
  // -----------------------------------------------------------------
  getters: {
    getUserCouponsForOrder: (state: any) => state.orderCoupons,
  },
  // -----------------------------------------------------------------
  mutations: {
    setUserCouponsForOrder(state: any, coupons: any) {
      Vue.set(state, "orderCoupons", coupons);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getCouponsForOrder: async (context: any, payload: any) => {
      const coupons = await couponService.getUserCouponsForOrder(payload.orderTotal);
      context.commit("setUserCouponsForOrder", coupons.data.coupons);
    },
  },
};
