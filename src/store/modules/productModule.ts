import Vue from "vue";
import productService from "../../services/productService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    products: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setProductByCategory(state: {}, products: []) {
      Vue.set(state, "products", products);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getProductByCategory: async (context: any, payload: any) => {
      await productService.getProductByCategory(payload.categoryId).then((response: any) => {
        context.commit("setProductByCategory", response.data.products);
      });
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
