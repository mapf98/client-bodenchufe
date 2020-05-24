import Vue from "vue";
import profileService from "../../services/profileService";
import signUpService from "../../services/signUpService";
import { fs, fb } from "../../firebase";

async function deleteImage(imageUrl: any) {
  return new Promise(function (resolve, reject) {
    const storage = fs;
    const storageUrlPath = storage.refFromURL(imageUrl);
    const storageRef = storage.ref(storageUrlPath.fullPath);
    storageRef.delete().catch((error) => {
      return error;
    });
  });
}

async function upImage(userId: any, imageFile: any) {
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
        reject();
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
    user: {},
    passwordStatus: {},
  },
  // -----------------------------------------------------------------
  getters: {
    getUserData: (state: any) => state.user,
    getPasswordStatus: (state: any) => state.passwordStatus,
  },
  // -----------------------------------------------------------------
  mutations: {
    setUserData(state: any, user: any) {
      Vue.set(state, "user", user);
    },
    setPasswordStatus(state: any, status: any) {
      Vue.set(state, "passwordStatus", status);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    userData: async (context: any, payload: any) => {
      const user = await profileService.getUserById().then((response: any) => {
        context.commit("setUserData", response.data.user[0]);
      });
    },
    updateImage: async (context: any, payload: any) => {
      if (
        payload.imageUrl != null &&
        payload.imageUrl != "photo" &&
        payload.imageUrl != ""
      ) {
        deleteImage(payload.imageUrl);
      }
      const newImageUrl = await upImage(payload.userId, payload.imageData);
      await signUpService
        .setUserPhoto({ userId: payload.userId, userPhoto: newImageUrl })
        .then(() => {
          const userStringyfy: any = localStorage.getItem("userData");
          const userData = JSON.parse(userStringyfy);
          userData.userPhoto = newImageUrl;
          localStorage.setItem("userData", JSON.stringify(userData));
        });
    },
    updateUserInfo: async (context: any, payload: any) => {
      await profileService.updateUserInfo(payload.user);
    },
    changePassword: async (context: any, payload: any) => {
      await profileService
        .changePassword(payload.userPasswordData)
        .then((res: any) => {
          const response = res.data.message;
          if (
            response ==
            "La contraseña no coincide con tu contraseña actual almacenada"
          ) {
            context.commit("setPasswordStatus", { correct: false });
          } else {
            context.commit("setPasswordStatus", { correct: true });
          }
        });
    },
    updateLanguage: async (context: any, payload: any) => {
      await profileService.updateLanguage(payload.languageName).then((res) => {
        if (res.data.updated == true) {
          const userStorageString: any = localStorage.getItem("userData");
          const userStorage = JSON.parse(userStorageString)
          userStorage.userLanguage = res.data.language;
          localStorage.setItem("userData", JSON.stringify(userStorage));
        }
      })
    }
  },
};
