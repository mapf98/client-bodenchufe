import Vue from "vue";
import shoppingCartService from "../../services/shoppingCartService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    products: [],
    productsBadge: 0,
  },
  // -----------------------------------------------------------------
  getters: {
    getProducts: (state: any) => state.products,
    getProductsBadge: (state: any) => state.productsBadge,
  },
  // -----------------------------------------------------------------
  mutations: {
    setShoppingCartProducts(state: any, products: any) {
      Vue.set(state, "products", products);
    },
    setProductsBadge(state: any, quantity: any) {
      Vue.set(state, "productsBadge", quantity);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    getShoppingCartProducts: async (context: any) => {
      const products = await shoppingCartService.getShoppingCart();
      context.commit("setProductsBadge", products.data.results);
      context.commit("setShoppingCartProducts", products.data.shoppingCart);
    },
    deleteShoppingCartProducts: async (context: any, payload: any) => {
      await shoppingCartService.deleteProduct(payload.productId);
    },
    updateQuantityProduct: async (context: any, payload: any) => {
      await shoppingCartService.updateQuantity(payload.productId, {
        productProviderOrderQuantity: payload.quantity,
      });
    },
    updateProductStatus: async (context: any, payload: any) => {
      await shoppingCartService.updateProductStatus(payload.productId, {
        status: payload.status,
      });
    },
    addProduct: async (context: any, payload: any) => {
      await shoppingCartService.addProduct(payload.postId, payload.quantity);
      const products = await shoppingCartService.getShoppingCart();
      context.commit("setProductsBadge", products.data.results);
    },
  },
};
