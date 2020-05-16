import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DashboardHome from "../components/DashboardHome.vue";
import Login from "../views/Login.vue";
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
