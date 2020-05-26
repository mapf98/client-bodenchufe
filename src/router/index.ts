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
import userProfile from "../views/userProfile.vue";
import ChangePassword from "../views/ChangePassword.vue";
import Categories from "../components/Categories.vue";
import Products from "../components/Products.vue";
import DeliveryAddress from "../views/DeliveryAddress.vue";
import AllDeliveries from "../components/AllDeliveries.vue";
import AddDelivery from "../components/AddDelivery.vue";
import AfterPay from "../views/AfterPay.vue";
import ProductDetail from "../components/ProductDetail.vue";
import Coupons from "../views/Coupons.vue";
import OrderHistory from "../views/OrderHistory.vue";
import NotFound from "../views/NotFound.vue";

import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    redirect: "/home",
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
        path: "/profile",
        name: "Profile",
        component: userProfile,
        meta: {
          requiresAuth: true,
          hideBasicComponents: false,
          applyBackground: false,
        },
      },
      {
        path: "/categories",
        name: "Categories",
        component: Categories,
        meta: {
          requiresAuth: false,
          hideBasicComponents: false,
          applyBackground: false,
        },
      },
      {
        path: "/products",
        name: "Products",
        component: Products,
        meta: {
          requiresAuth: false,
          hideBasicComponents: false,
          applyBackground: false,
        },
      },
      {
        path: "/detail",
        name: "Detail",
        component: ProductDetail,
        meta: {
          requiresAuth: false,
          hideBasicComponents: false,
          applyBackground: false,
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
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      requiresAuth: true,
      hideBasicComponents: true,
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
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
      hideBasicComponents: true,
      applyBackground: true,
    },
  },
  {
    path: "/success",
    name: "AfterPay",
    component: AfterPay,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
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
  {
    path: "/delivery",
    name: "Delivery",
    component: DeliveryAddress,
    children: [
      {
        path: "all",
        name: "Addresses",
        component: AllDeliveries,
        meta: {
          requiresAuth: true,
          hideBasicComponents: true,
          applyBackground: false,
        },
      },
      {
        path: "add",
        name: "AddDelivery",
        component: AddDelivery,
        meta: {
          requiresAuth: true,
          hideBasicComponents: true,
          applyBackground: false,
        },
      },
    ],
    meta: {
      requiresAuth: true,
      hideBasicComponents: true,
      applyBackground: false,
    },
  },
  {
    path: "/coupons",
    name: "Coupons",
    component: Coupons,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
      applyBackground: false,
    },
  },
  {
    path: "/orderHistory",
    name: "OrderHistory",
    component: OrderHistory,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
      applyBackground: false,
    },
  },
  {
    path: "*",
    component: NotFound,
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
      const tokenData: any = jwt.decodeToken(yourToken);
      const tokenExp = new Date(tokenData.exp);
      const actualDate = Date.now();
      if (tokenExp.getDate() > actualDate) {
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
