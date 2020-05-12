import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import internationalization from "./modules/internationalizationModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    internationalization,
  },
});
