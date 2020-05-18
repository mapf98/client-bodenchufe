import Vue from "vue";
import profileService from "../../services/profileService";
export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    user: {}
  },
  // -----------------------------------------------------------------
  getters: {
    getUserData: (state: any) => state.user
  },
  // -----------------------------------------------------------------
  mutations: {
    setUserData(state: any, user: any) {
      Vue.set(state, "user", user);
    },
  },
  // -----------------------------------------------------------------
  actions: {

    userData: async (context: any, payload: any) => {
      const user = await profileService.getUserById().then((response:any) => {
        context.commit("setUserData", response.data.user[0]);
      });
    }
  },
};
