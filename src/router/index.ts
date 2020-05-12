import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import T1 from "../components/test1.vue";
import T2 from "../components/test2.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "T1",
        name: "T1",
        component: T1
      },
      {
        path: "T2",
        name: "T2",
        component: T2
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
