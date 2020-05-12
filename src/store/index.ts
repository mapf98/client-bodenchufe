import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import translate from "./modules/translateModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    translate,
  },
});
