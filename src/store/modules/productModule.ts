import Vue from "vue";
import productService from "../../services/productService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    products: [],
    productsPath: "",
    productDetail: {},
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
    getProductsPath: (state: any) => state.productsPath,
    getProductDetail: (state: any) => state.productDetail,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setProductByCategory(state: {}, products: []) {
      Vue.set(state, "products", products);
    },
    setProductsPath(state: {}, path: []) {
      Vue.set(state, "productsPath", path);
    },
    setProductDetail(state: {}, productDetail: {}) {
      Vue.set(state, "productDetail", productDetail);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getProductByCategory: async (context: any, payload: any) => {
      await productService
        .getProductByCategory(payload.categoryId)
        .then((response: any) => {
          context.commit("setProductByCategory", response.data.products);
          context.commit("setProductsPath", payload.name);
        });
    },
    getProductDetail: async (context: any, payload: any) => {
      await productService
        .getProductDetail(payload.postId)
        .then((response: any) => {
          const productDetail = {
            details: response.data.product,
            qualifications: response.data.qualifications,
          };
          context.commit("setProductDetail", productDetail);
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
