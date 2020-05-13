import Vue from "vue";
import internationalizationService from "../../services/internationalizationService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    languagesTexts: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    //collection: (state: any) => state.users,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setLanguageTexts(state: {}, languagesTexts: []) {
      Vue.set(state, "languagesTexts", languagesTexts);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getTranslate: async (context: any, payload: any) => {
      await internationalizationService
        .getTranslate(payload.lang)
        .then((response: any) => {
          context.commit("setLanguageTexts", response.data.terms);
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
