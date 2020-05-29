import Vue from "vue";
import homeService from "../../services/homeService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    providers: [],
    categories: [],
    offers: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getMainProviders: (state: any) => state.providers,
    getMainCategories: (state: any) => state.categories,
    getOffers: (state: any) => state.offers,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setMainProviders(state: any, providers: []) {
      Vue.set(state, "providers", providers);
    },
    setMainCategories(state: any, categories: []) {
      Vue.set(state, "categories", categories);
    },
    setOffers(state: any, offers: []) {
      Vue.set(state, "offers", offers);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getMainProviders: async (context: any) => {
      await homeService.getMainProviders().then((response: any) => {
        context.commit("setMainProviders", response.data.providers);
      });
    },
    getMainCategories: async (context: any) => {
      await homeService.getMainCategories().then((response: any) => {
        context.commit("setMainCategories", response.data.categories);
      });
    },
    getOffers: async (context: any) => {
      await homeService.getOffers().then((response: any) => {
        context.commit("setOffers", response.data.offers);
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
