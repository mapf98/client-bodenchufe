<template>
  <v-container>
    <v-card class="pa-5" elevation="5">
      <v-row>
        <v-col class="text-center">
          <v-avatar size="200" color="white">
            <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
            <v-img
              :src="userUrlPhoto == 'photo' ? placeHolcerImg : userUrlPhoto"
              v-if="agregado"
              :contain="userUrlPhoto == placeHolcerImg"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center d-flex justify-center">
          <v-btn
            @click="$refs.fileInp.click()"
            ref="take"
            class="white--text"
            color="indigo"
            :loading="loading"
            :width="buttonCols()"
          >
            <input
              @change="updateImg"
              type="file"
              ref="fileInp"
              style="display: none;"
              accept="image/*"
            />
            <v-icon class="mr-2">mdi-camera</v-icon>
            {{ changePhotoText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="indigo" dark v-on="on" :width="buttonCols()">
                <v-icon class="mr-4">mdi-translate</v-icon>
                {{ languageName }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item.value"
                @click="updateLanguage(item.value)"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center d-flex justify-center">
          <v-btn
            class="white--text"
            color="indigo"
            :width="buttonCols()"
            :disabled="allFields"
            @click="updateUserInfo()"
          >
            <v-icon class="mr-2">mdi-account-edit</v-icon>
            {{ saveChangeText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col :cols="separatorCols()">
                <v-text-field
                  type="text"
                  v-model="user.user_first_name"
                  :label="userFirstNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col :cols="separatorCols()">
                <v-text-field
                  type="text"
                  v-model="user.user_second_name"
                  :label="userSecondNameText"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="separatorCols()">
                <v-text-field
                  type="text"
                  v-model="user.user_first_lastname"
                  :label="userFirstLastNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col :cols="separatorCols()">
                <v-text-field
                  type="text"
                  v-model="user.user_second_lastname"
                  :label="userSecondLastNameText"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="separatorCols()">
                <v-text-field
                  type="text"
                  v-model="user.user_email"
                  :label="userEmailText"
                  disabled
                  required
                ></v-text-field>
              </v-col>
              <v-col :cols="separatorCols()">
                <v-menu
                  ref="menu"
                  v-model="menuRef"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="user.user_birthdate"
                      :label="userBirthDateText"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="user.user_birthdate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar
      v-model="snackbarError"
      color="indigo darken-4 px-3"
      class="mb-5 my-5"
      top
    >
      <ul>
        <li class="body-1" v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>
      <v-btn color="amber" text @click="snackbarError = false" small>
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class ProfileInfo extends Vue {
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  changePhotoText = "Change your Photo";
  saveChangeText = "Save your changes";
  saveChangeSuccefullyText = "Your changes has been saved";

  items = [
    { text: "English US", value: "en-us" },
    { text: "Spanish VE", value: "es-ve" },
  ];
  languageName = "";

  snackbarError = false;
  errors: Array<string> = [];
  valid = true;
  agregado = false;
  menuRef = false;
  loading = false;
  allFields = false;
  placeHolcerImg =
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2FFotofinal.png?alt=media&token=d9d54e10-3ad2-4906-8986-890b38a27d38";

  userData: any;
  userDataString: any;
  userDataProp!: any;
  userUrlPhoto = "";
  newPhoto: any;
  getdate: any = "";

  userNameRulesLength = "Name must be less than 10 characters";
  userNameRulesRequired = "Name is required";
  btnLanguage = "Select your preferred language";

  user: any = {};

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  nameRules = [(v: any) => !!v || this.userNameRulesRequired];

  @Watch("user.user_first_name")
  @Watch("user.user_first_lastname")
  disableChangeInfoButton() {
    if (
      this.user.user_first_name.length == 0 ||
      this.user.user_first_lastname.length == 0
    ) {
      this.allFields = true;
    } else {
      this.allFields = false;
    }
  }

  @Watch("preferredLanguage")
  translateLanguage() {
    this.languageName = this.preferredLanguage;
    this.$store.dispatch("internationalization/getTranslate", {
      lang: this.languageName,
    });
  }

  //Match para incluir los terminos de poeditor en el modulo
  //En base al lenguaje de preferencia del usuario o el que seleccione en la aplicacion
  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "userFirstNameText": {
          this.userFirstNameText = term.termTranslation;
          break;
        }
        case "userSecondNameText": {
          this.userSecondNameText = term.termTranslation;
          break;
        }
        case "userFirstLastNameText": {
          this.userFirstLastNameText = term.termTranslation;
          break;
        }
        case "userSecondLastNameText": {
          this.userSecondLastNameText = term.termTranslation;
          break;
        }
        case "userBirthDateText": {
          this.userBirthDateText = term.termTranslation;
          break;
        }
        case "changePhotoText": {
          this.changePhotoText = term.termTranslation;
          break;
        }
        case "saveChangeText": {
          this.saveChangeText = term.termTranslation;
          break;
        }
        case "saveChangeSuccefullyText": {
          this.saveChangeSuccefullyText = term.termTranslation;
          break;
        }
        case "btnLanguage": {
          this.btnLanguage = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  getUserLanguage() {
    const userStorageString: any = localStorage.getItem("userData");
    const userStorage = JSON.parse(userStorageString).userLanguage;
    this.languageName = userStorage;
  }

  getTranslate() {
    this.$store.dispatch("internationalization/getTranslate", {
      lang: this.languageName,
    });
  }

  get preferredLanguage() {
    return this.$store.getters["internationalization/getPreferredLanguage"];
  }

  get getUser() {
    return this.$store.getters["profile/getUserData"];
  }

  //Getter de todos los terminos almacenados en PoEditor
  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  updateLanguage(language: string) {
    this.languageName = language;
    this.$store
      .dispatch("profile/updateLanguage", {
        languageName: this.languageName,
      })
      .then(() => {
        this.getTranslate();
      });
  }

  updateUserInfo() {
    this.$store
      .dispatch("profile/updateUserInfo", { user: this.user })
      .then(() => {
        this.errors.splice(0);
        this.errors.push(this.saveChangeSuccefullyText);
        this.showErrors(this.errors);
      });
  }

  //El parametro event proviene del evento cuando el usuario selecciona la imagen a subir o actualizar
  //Cambia el estatus de una nueva foto a falsa para prevenir errores y luego la actualiza
  updateImg(event: any) {
    if (event) {
      const files = event.target.files[0] || event.dataTransfer.files;
      this.newPhoto = files;
      this.loading = true;
      this.$store.dispatch("profile/newUserPhoto", false).then(() => {
        this.$store
          .dispatch("profile/updateImage", {
            imageUrl: this.userUrlPhoto,
            imageData: this.newPhoto,
            userId: this.user.user_id,
          })
          .then(() => {
            this.loading = false;
            const user: any = localStorage.getItem("userData");
            this.userUrlPhoto = JSON.parse(user).userPhoto;
          });
      });
    } else {
      this.agregado = false;
    }
  }

  //El formato de la fecha viene con Hora, se hace un split para obtener solo la fecha
  getUserData() {
    this.$store.dispatch("profile/userData").then(() => {
      this.user = this.getUser;
      this.getdate = this.user.user_birthdate.split("T");
      this.user.user_birthdate = this.getdate[0];
    });
  }

  showImageIfExist() {
    this.userDataString = localStorage.getItem("userData");
    this.userData = JSON.parse(this.userDataString);
    this.userUrlPhoto = this.userData.userPhoto;
    if (this.userUrlPhoto.length > 0) {
      this.agregado = true;
    }
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  buttonCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs ? 200 : sm ? 280 : 350;
  }

  save(date: Date) {
    this.$refs.menu.save(date);
  }

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  mounted() {
    this.showImageIfExist();
    this.getUserData();
    this.translate();
    this.getUserLanguage();
  }
}
</script>

<style lang="scss"></style>
