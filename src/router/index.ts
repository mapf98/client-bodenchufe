import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DashboardHome from "../components/DashboardHome.vue";
import Login from "../views/Login.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import SignUp from "../views/SignUp.vue";
import AllSignUp from "../components/AllSignUp.vue";
import NotFederatedSignUp from "../components/NotFederatedSignUp.vue";
import Checkout from "../views/Checkout.vue";

import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/home",
        name: "DashboardHome",
        component: DashboardHome,
        meta: {
          requiresAuth: false,
          hideBasicComponents: false,
        },
      },
    ],
    meta: {
      requiresAuth: false,
      hideBasicComponents: false,
      applyBackground: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      hideBasicComponents: true,
      applyBackground: true,
    },
  },
  {
    path: "/shoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
      hideBasicComponents: true,
    },
  },
  {
    path: "/user",
    name: "SignUp",
    component: SignUp,
    children: [
      {
        path: "signUp",
        name: "All",
        component: AllSignUp,
        meta: {
          requiresAuth: false,
          hideBasicComponents: true,
          applyBackground: true,
        },
      },
      {
        path: "signUp/external",
        name: "Usual",
        component: NotFederatedSignUp,
        meta: {
          requiresAuth: false,
          hideBasicComponents: true,
          applyBackground: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (route.meta.requiresAuth) {
      const yourToken: any = localStorage.getItem("token");
      if (jwt.isExpired(yourToken)) {
        localStorage.clear();
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
