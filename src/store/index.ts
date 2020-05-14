import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import internationalization from "./modules/internationalizationModule";
import logIn from "./modules/logInModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    internationalization,
    logIn,
  },
});
