import Vue from "vue";
import homeService from "../../services/homeService";

export default {
  namespaced: true,
  state: {
    providers: [],
    categories: [],
    offers: [],
  },
  getters: {
    getMainProviders: (state: any) => state.providers,
    getMainCategories: (state: any) => state.categories,
    getOffers: (state: any) => state.offers,
  },
  mutations: {
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
  actions: {
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
  },
};
