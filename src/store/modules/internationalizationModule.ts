import Vue from "vue";
import internationalizationService from "../../services/internationalizationService";

export default {
  namespaced: true,
  state: {
    languagesTexts: [],
    preferredLanguage: "en-us",
  },
  getters: {
    getLanguageTexts: (state: any) => state.languagesTexts,
    getPreferredLanguage: (state: any) => state.preferredLanguage,
  },
  mutations: {
    setLanguageTexts(state: any, languagesTexts: []) {
      Vue.set(state, "languagesTexts", languagesTexts);
    },
    setPreferredLanguage(state: any, language: string) {
      Vue.set(state, "preferredLanguage", language);
    },
  },
  actions: {
    getTranslate: async (context: any, payload: any) => {
      await internationalizationService
        .getTranslate(payload.lang)
        .then((response: any) => {
          context.commit("setLanguageTexts", response.data.terms);
          context.commit("setPreferredLanguage", payload.lang);
        });
    },
    setUserLanguage: (context: any) => {
      const userData = localStorage.getItem("userData");
      let userLanguage: string;
      let user: any;
      if (userData !== null) {
        user = JSON.parse(userData);
        userLanguage = user.userLanguage;
        context.commit("setPreferredLanguage", userLanguage);
      } else {
        context.commit("setPreferredLanguage", "en-us");
      }
    },
  },
};
