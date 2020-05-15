import Vue from "vue";
import logInService from "../../services/logInService";
import { fa, providerGoogle, providerFacebook } from "../../firebase";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    user: {},
    status: {},
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getLoginUserData: (state: any) => state.user,
    getLoginStatus: (state: any) => state.status,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setUser(state: {}, user: any) {
      Vue.set(state, "user", user);
    },
    setStatus(state: {}, status: any) {
      Vue.set(state, "status", status);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    notFederatedLogIn: async (context: any, payload: any) => {
      console.log(payload.user);
      await logInService.checkLogIn(payload.user).then((response: any) => {
        if (response.data.validated == true) {
          localStorage.setItem("token", response.data.token);
          context.commit("setUser", response.data.user[0]);
          context.commit("setStatus", {
            validado: true,
            bloqueado: false,
            registered: true,
          });
        }
        if (response.data.validated == false) {
          context.commit("setStatus", {
            validated: false,
            blocked: false,
            registered: true,
          }); //combinacion de correo y password incorrecto
          if (response.data.blocked == true) {
            context.commit("setStatus", {
              validated: false,
              blocked: true,
              registered: true,
            }); //usuario bloqueado
          }
        }
        if (response.data.registered == false) {
          context.commit("setStatus", {
            validated: false,
            blocked: false,
            registered: false,
          }); //correo no registrado
        }
      });
    },
    federatedLogIn: async (context: any, payload: any) => {
      let userEmail: string | null | undefined;

      await fa
        .signInWithPopup(
          payload.provider == "google" ? providerGoogle : providerFacebook
        )
        .then((result) => {
          userEmail = result.user?.email;
        })
        .catch((error) => {
          console.log(error);
        });

      await logInService
        .checkLogIn({ userEmail: userEmail, userPassword: "" })
        .then((response: any) => {
          if (response.data.validated == true) {
            localStorage.setItem("token", response.data.token);
            context.commit("setUser", response.data.user[0]);
            context.commit("setStatus", {
              validado: true,
              bloqueado: false,
              registered: true,
            });
          }
          if (
            response.data.validated == false &&
            response.data.blocked == true
          ) {
            context.commit("setStatus", {
              validated: false,
              blocked: true,
              registered: true,
            }); //usuario bloqueado
          }
          if (response.data.registered == false) {
            context.commit("setStatus", {
              validated: false,
              blocked: false,
              registered: false,
            }); //correo no registrado
          }
        });
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
