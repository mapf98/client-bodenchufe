import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import internationalization from "./modules/internationalizationModule";
import logIn from "./modules/logInModule";
import shoppingCart from "./modules/shoppingCartModule";
import signUp from "./modules/signUpModule";
import home from "./modules/homeModule";
import address from "./modules/addressModule";
import coupon from "./modules/couponModule";
import checkout from "./modules/checkoutModule";
import profile from "./modules/profileModule";
import category from "./modules/categoryModule";
import product from "./modules/productModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    internationalization,
    logIn,
    shoppingCart,
    signUp,
    home,
    address,
    coupon,
    checkout,
    profile,
    category,
    product,
  },
});
