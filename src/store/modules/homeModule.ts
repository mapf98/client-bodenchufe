import Vue from "vue";
import homeService from "../../services/homeService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    providers: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getMainProviders: (state: any) => state.providers,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setMainProviders(state: {}, providers: []) {
      Vue.set(state, "providers", providers);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getMainProviders: async (context: any) => {
      await homeService
        .getMainProviders()
        .then((response: any) => {
          context.commit("setMainProviders", response.data.providers);
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
