import Vue from "vue";
import shoppingCartService from "../../services/shoppingCartService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    products: [],
  },
  // -----------------------------------------------------------------
  getters: {
    getProducts: (state: any) => state.products,
  },
  // -----------------------------------------------------------------
  mutations: {
    setShoppingCartProducts(state: any, products: any) {
      Vue.set(state, "products", products);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getShoppingCartProducts: async (context: any, payload: any) => {
      const products = await shoppingCartService.getShoppingCart();
      context.commit("setShoppingCartProducts", products.data.shoppingCart);
    },
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },
    updateQuantityProduct : async (context: any, payload: any) => {
      await shoppingCartService.updateQuantity(payload.productId,{ productProviderOrderQuantity: payload.quantity});
    },
    updateProductStatus : async (context: any, payload: any) => {
      await shoppingCartService.updateProductStatus(payload.productId,{ status: payload.status});
    },
  },
}

