import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import internationalization from "./modules/internationalizationModule";
import logIn from "./modules/logInModule";
import signUp from "./modules/signUpModule";
import home from "./modules/homeModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    internationalization,
    logIn,
    signUp,
    home,
  },
});
