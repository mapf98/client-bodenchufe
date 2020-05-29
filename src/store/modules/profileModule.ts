import Vue from "vue";
import profileService from "../../services/profileService";
import signUpService from "../../services/signUpService";
import { fs, fb } from "../../firebase";
import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

//Borra la imagen Almacenada en Firebase
//el storageUrlPath devuelve el path de almacenamiento en firebase
async function deleteImage(imageUrl: any) {
  return new Promise(function (resolve, reject) {
    const storage = fs;
    const storageUrlPath = storage.refFromURL(imageUrl);
    const storageRef = storage.ref(storageUrlPath.fullPath);
    storageRef
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject();
        return error;
      });
  });
}

//Se sube la imagen a Firebase
//El StorageRef crea una carpeta en el servidor con una ruta a partir del id del usuario en la base de datos
//Cuando termina de subir el archivo se obtiene la url
async function upImage(userId: any, imageFile: any) {
  return new Promise(function (resolve, reject) {
    const storageRef = fb
      .storage()
      .ref("images/user/" + userId + "/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on(
      "state_changed",
      null,
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
  state: {
    user: {},
    passwordStatus: {},
    newUserPhoto: false,
  },

  getters: {
    getUserData: (state: any) => state.user,
    getPasswordStatus: (state: any) => state.passwordStatus,
    getNewUserPhoto: (state: any) => state.newUserPhoto,
  },

  mutations: {
    setUserData(state: any, user: any) {
      Vue.set(state, "user", user);
    },
    setPasswordStatus(state: any, status: any) {
      Vue.set(state, "passwordStatus", status);
    },
    setNewUserPhoto(state: any, newUserPhoto: boolean) {
      Vue.set(state, "newUserPhoto", newUserPhoto);
    },
  },

  actions: {
    userData: async (context: any) => {
      await profileService.getUserById().then((response: any) => {
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
      context.commit("setNewUserPhoto", true);
    },
    updateUserInfo: async (context: any, payload: any) => {
      await profileService.updateUserInfo(payload.user);
    },
    newUserPhoto: async (context: any, payload: any) => {
      context.commit("setNewUserPhoto", payload);
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
          const userStorage = JSON.parse(userStorageString);
          userStorage.userLanguage = res.data.language;
          localStorage.setItem("userData", JSON.stringify(userStorage));
        }
      });
    },
    checkToken: () => {
      const yourToken: any = localStorage.getItem("token");
      const tokenData: any = jwt.decodeToken(yourToken);
      const tokenExp = new Date(tokenData.exp);
      const actualDate = new Date();
      if (tokenExp <= actualDate) {
        return false;
      } else {
        return true;
      }
    },
  },
};
