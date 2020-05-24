import Vue from "vue";
import couponService from "@/services/couponService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    orderCoupons: [],
    userCoupons: [],
  },
  // -----------------------------------------------------------------
  getters: {
    getUserCouponsForOrder: (state: any) => state.orderCoupons,
    getUserCoupons: (state: any) => state.userCoupons,
  },
  // -----------------------------------------------------------------
  mutations: {
    setUserCouponsForOrder(state: any, coupons: any) {
      Vue.set(state, "orderCoupons", coupons);
    },
    setUserCoupons(state: any, userCoupons: any) {
      Vue.set(state, "userCoupons", userCoupons);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getCouponsForOrder: async (context: any, payload: any) => {
      const coupons = await couponService.getUserCouponsForOrder(payload.orderTotal);
      context.commit("setUserCouponsForOrder", coupons.data.coupons);
    },
    getUserCoupon: async (context: any) => {
      await couponService.getUserCoupons().then((res: any) => {
        context.commit("setUserCoupons", res.data.coupons);
      });
    },
  },
};
