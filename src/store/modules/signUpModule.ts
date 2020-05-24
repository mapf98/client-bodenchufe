import Vue from "vue";
import signUpService from "../../services/signUpService";
import logInService from "../../services/logInService";
import { fa, fb, providerGoogle, providerFacebook } from "../../firebase";

async function uploadTaskPromise(userId: any, imageFile: any) {
  return new Promise(function (resolve, reject) {
    let finalSnapshot;
    const storageRef = fb
      .storage()
      .ref("images/user/" + userId + "/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on(
      "state_changed",
      async (snapshot: any) => {
        finalSnapshot = snapshot.state;
      },
      (error) => {
        reject(error);
      },
      async () => {
        await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

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
    setUser(state: any, user: any) {
      Vue.set(state, "user", user);
    },
    setStatus(state: any, status: any) {
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
      let userEmail: any;
      let userPassword: any;

      const userData: any = {
        userName: "",
        userLastName: "",
        userLanguage: "",
        userPhoto: "",
        userType: "notFederated",
      };

      await signUpService.signUp(payload.user).then((response: any) => {
        if (response.data.registered == true) {
          userId = response.data.user[0].user_id;
          userEmail = response.data.user[0].user_email;
          userPassword = response.data.user[0].user_password;
          context.commit("setStatus", {
            validated: true,
            blocked: false,
            registered: true,
          });
        } else {
          context.commit("setStatus", { registered: false }); //el correo ya esta usado
        }
      });

      if (userId && payload.imageFile) {
        const imageUrl = await uploadTaskPromise(userId, payload.imageFile);
        await signUpService
          .setUserPhoto({
            userId: userId,
            userPhoto: imageUrl,
          })
          .then(async () => {
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
                  context.commit("setStatus", {
                    validated: true,
                    blocked: false,
                    registered: true,
                  });
                }
              });
          });
      } else {
        await logInService
          .checkLogIn({ userEmail: userEmail, userPassword: userPassword })
          .then((response: any) => {
            if (response.data.validated == true) {
              userData.userName = response.data.user[0].user_first_name;
              userData.userLastName = response.data.user[0].user_first_lastname;
              userData.userLanguage = response.data.user[0].language_name;
              userData.userPhoto = response.data.user[0].user_photo;
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userData", JSON.stringify(userData));
              context.commit("setUser", response.data.user[0]);
              context.commit("setStatus", {
                validated: true,
                blocked: false,
                registered: true,
              });
            }
          });
      }
    },

    federatedSignUp: async (context: any, payload: any) => {
      let isRegistered: any = true;

      const userData: any = {
        userFirstName: "",
        userFirstLastname: "",
        languageName: "en-us",
        userPassword: null,
        userPhoto: "",
        userEmail: "",
        rolName: "user",
        userBirthdate: null,
      };
      const userInLs: any = {
        userName: "",
        userLastName: "",
        userLanguage: "",
        userPhoto: "",
        userType: "federated",
      };

      let googleProfile: any;
      await fa
        .signInWithPopup(
          payload.provider == "google" ? providerGoogle : providerFacebook
        )
        .then((result) => {
          if (payload.provider == "google") {
            googleProfile = result.additionalUserInfo?.profile;
            userData.userFirstName = googleProfile.given_name;
            userData.userFirstLastname = googleProfile.family_name;
            userData.userPhoto = googleProfile.picture;
            userData.userEmail = googleProfile.email;
            fa.signOut();
          } else {
            googleProfile = result.additionalUserInfo?.profile;
            userData.userFirstName = googleProfile.first_name;
            userData.userFirstLastname = googleProfile.last_name;
            userData.userPhoto = googleProfile.picture.data.url;
            userData.userEmail = googleProfile.email;
            fa.signOut();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      await signUpService.signUp(userData).then((response: any) => {
        if (response.data.registered == true) {
          context.commit("setStatus", { registered: true });
        } else {
          isRegistered = false;
          context.commit("setStatus", { registered: false }); //el correo ya esta usado
        }
      });

      await logInService
        .checkLogIn({ userEmail: userData.userEmail, userPassword: null })
        .then((response: any) => {
          if (response.data.validated == true && isRegistered == true) {
            userInLs.userName = response.data.user[0].user_first_name;
            userInLs.userLastName = response.data.user[0].user_first_lastname;
            userInLs.userLanguage = response.data.user[0].language_name;
            userInLs.userPhoto = response.data.user[0].user_photo;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify(userInLs));
            context.commit("setUser", response.data.user[0]);
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
