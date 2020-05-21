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
      const coupons = await couponService.getUserCouponsForOrder(150);
      context.commit("setUserCouponsForOrder", coupons.data.coupons);
    },
    /*
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },*/
  },
};
