import Vue from "vue";
import signUpService from "../../services/signUpService";
import { fa, fb, providerGoogle, providerFacebook } from "../../firebase";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    notFederatedSignUp: async (context: any, payload: any) => {
      let userId;
      let imageUrl;

      await signUpService.signUp(payload.user).then((response: any) => {
        console.log("datos del usuario payload ", payload.user);
        console.log("datos del usuario ", response);
        userId = response.data.user[0].user_id;
      });
      console.log(userId);

      if (userId) {
        const storageRef = fb
          .storage()
          .ref("images/user/" + userId + "/" + payload.imageFile);
        const uploadTask = storageRef.put(payload.imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              imageUrl = downloadURL;
              console.log("File available at", imageUrl);
            });
          }
        );
      }

      await signUpService.setUserPhoto({ userId: userId, userPhoto: imageUrl });
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
