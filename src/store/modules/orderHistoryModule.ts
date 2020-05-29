import Vue from "vue";
import orderHistoryService from "../../services/orderHistoryService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    orders: [],
  },
  // -----------------------------------------------------------------
  getters: {
    getOrders: (state: any) => state.orders,
  },
  // -----------------------------------------------------------------
  mutations: {
    setUserOrders(state: any, orders: any) {
      Vue.set(state, "orders", orders);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getOrders: async (context: any) => {
      const orders = await orderHistoryService.getOrders();
      context.commit("setUserOrders", orders.data.orders);
    },
    createRating: async (contex: any, payload: any) => {
      return await orderHistoryService.rateProduct(payload);
    },
    checkProductAlreadyRated: async (contex: any, payload: any) => {
      return await orderHistoryService.checkProductAlreadyRated(payload);
    },
  },
};
