import Vue from "vue";
import signUpService from "../../services/signUpService";
import logInService from "../../services/logInService";
import { fa, fb, providerGoogle, providerFacebook } from "../../firebase";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los
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
    notFederatedSignUp: async (context: any, payload: any) => {
      let userId: any;
      let imageUrl: any;
      let userEmail: any;
      let userPassword: any;
      let snapshotFinal;

      const userData: any = {
        userName: "",
        userLastName: "",
        userLanguage: "",
        userPhoto: "",
      };

      await signUpService.signUp(payload.user).then((response: any) => {
        if (response.data.registered == true) {
          userId = response.data.user[0].user_id;
          userEmail = response.data.user[0].user_email;
          userPassword = response.data.user[0].user_password;
        } else {
          context.commit("setStatus", { registered: false }); //el correo ya esta usado
        }
      });

      if (userId) {
        const storageRef = fb
          .storage()
          .ref("images/user/" + userId + "/" + payload.imageFile);
        const uploadTask = storageRef.put(payload.imageFile);

        uploadTask.on(
          "state_changed",
          async (snapshot) => {
            snapshotFinal = snapshot.state;
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                imageUrl = downloadURL;
                console.log("File available at", imageUrl);
              });
            await signUpService.setUserPhoto({
              userId: userId,
              userPhoto: imageUrl,
            });
            await logInService
              .checkLogIn({ userEmail: userEmail, userPassword: userPassword })
              .then((response: any) => {
                if (response.data.validated == true) {
                  userData.userName = response.data.user[0].user_first_name;
                  userData.userLastName =
                    response.data.user[0].user_first_lastname;
                  userData.userLanguage = response.data.user[0].language_name;
                  userData.userPhoto = response.data.user[0].user_photo;
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("userData", JSON.stringify(userData));
                  context.commit("setUser", response.data.user[0]);
                }
              });
          }
        );
      }
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
