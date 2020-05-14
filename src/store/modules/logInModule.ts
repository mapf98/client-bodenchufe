import Vue from "vue";
import logInService from "../../services/logInService"

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    user: {},
    status: {}
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    //collection: (state: any) => state.users,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setUser(state: {}, user: any) {
      Vue.set(state, "user", user);
    },
    setStatus(state: {}, status: any){
      Vue.set(state, "status", status);
    }
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    notFederatedLogIn: async (context: any, payload: any) => {
      await logInService
        .notFederatedLogIn(payload.user)
        .then((response: any) => {
          console.log(response);
          if (response.data.validated == true){
            localStorage.setItem("token", response.data.token);
            context.commit("setUser", response.data.user[0]);
            context.commit("setStatus", {validado: true, bloqueado:false, registered:true})
          }      
          if (response.data.validated == false){
            context.commit("setStatus", {validated: false, blocked:false, registered:true}); //combinacion de correo y password incorrecto
            if (response.data.blocked == true){

              context.commit("setStatus", {validated: false, blocked:true, registered:true}); //usuario bloqueado
            }
          }
          if (response.data.registered == false){
            context.commit("setStatus", {validated: false, blocked:false, registered:false}); //correo no registrado
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