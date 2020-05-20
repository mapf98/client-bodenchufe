import Vue from "vue";
import categoryService from "../../services/categoryService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    categories: [],  
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getCategories: (state: any) => state.categories,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setCategories(state: {}, categories: []) {
      Vue.set(state, "categories", categories);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getCategories: async (context: any) => {
      await categoryService.getCategories().then((response: any) => {
        context.commit("setCategories", response.data.categories);
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
