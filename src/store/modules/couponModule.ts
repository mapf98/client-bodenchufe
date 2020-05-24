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
    getCouponsForOrder: async (context: any) => {
      const coupons = await couponService.getUserCouponsForOrder(5150);
      context.commit("setUserCouponsForOrder", coupons.data.coupons);
    },
<<<<<<< HEAD
    getUserCoupon: async (context: any, payload: any) => {
=======
    getUserCoupon: async (context: any) => {
>>>>>>> 7697e52d7f2d3a6ec04373a1f524120bdc6d6e10
      await couponService.getUserCoupons().then((res: any) => {
        context.commit("setUserCoupons", res.data.coupons);
      });
    },
  },
};
