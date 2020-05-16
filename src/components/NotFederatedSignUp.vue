<template>
  <v-container>
    <v-card>
      <v-row class="">
        <v-col md="1"></v-col>
        <v-col md="4" class="text-center">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userFirstName"
                  :label="userFirstNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userFirstLastname"
                  :label="userFirstLastNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userEmail"
                  :label="userEmailText"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="password"
                  v-model="user.userPassword"
                  :label="userPasswordText"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
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
                      v-model="user.userBirthdate"
                      :label="userBirthDateText"
                      :rules="birthDateRules"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="user.userBirthdate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col md="2"></v-col>
        <v-col md="4" class="text-center">
          <SignUpPhoto @imageFiles="imageFile = $event" />
          <SignUpLanguage @languageName="user.languageName = $event" />
        </v-col>
        <v-col md="1"></v-col>
      </v-row>
    </v-card>
    <v-row class="mt-12">
      <v-col class="text-center">
        <v-btn
          :disabled="!valid"
          :loading="loading"
          class="white--text mb-12"
          color="amber"
          type="submit"
          @click="signUp"
          >{{ registerBtnText
          }}<v-icon class="ml-5">mdi-location-enter</v-icon></v-btn
        >
      </v-col>
    </v-row>
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

import SignUpPhoto from "./SignUpPhoto.vue";
import SignUpLanguage from "./SignUpLanguage.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    SignUpPhoto,
    SignUpLanguage,
  },
})
export default class NotFederatedSingUp extends Vue {
  loading = false;
  menuRef = false;
  valid = true;
  date = null;
  snackbarError = false;
  errors: Array<string> = [];

  //PoEditor Terms
  registerBtnText = "Check In";
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  userPasswordText = "Password";

  userNameRulesLength = "Name must be less than 10 characters";
  userNameRulesRequired = "Name is required";
  userPasswordRulesLength = "Password must be less than 8 characters";
  userPasswordRulesRequired = "Password is required";
  userEmailRulesRequired = "Email is required";
  userEmailRulesValid = "Email must be valid";
  userBirthdayRulesRequired = "Birthday Date is required";
  userEmailRegisteredTrue = "This email is already in use";

  btnLanguage: never | string = "Select your preferred language";

  //userInfo
  user = {
    userFirstName: "",
    userFirstLastname: "",
    userBirthdate: null,
    userEmail: "",
    userPassword: "",
    userPhoto: "photo",
    languageName: "",
    rolName: "user",
  };
  imageFile: any; //foto que viene del hijo "aun no en FIREBASE"

  nameRules = [
    (v: any) => !!v || this.userNameRulesRequired,
    (v: any) => v.length <= 10 || this.userNameRulesLength,
  ];

  passwordRules = [
    (v: any) => !!v || this.userPasswordRulesRequired,
    (v: any) => v.length >= 8 || this.userPasswordRulesLength,
  ];

  emailRules = [
    (v: any) => !!v || this.userEmailRulesRequired,
    (v: any) => /.+@.+/.test(v) || this.userEmailRulesValid,
  ];

  birthDateRules = [(v: any) => !!v || this.userBirthdayRulesRequired];

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  save(date: Date) {
    this.$refs.menu.save(date);
  }

  signUp() {
    this.loading = true;
    if (this.$refs.form.validate() && this.user.languageName != "") {
      this.$store
        .dispatch("signUp/notFederatedSignUp", {
          user: this.user,
          imageFile: this.imageFile,
        })
        .then(() => {
          console.log(this.getStatus.registered);
          if (this.getStatus.registered == false) {
            this.loading = false;
            this.errors.push(this.userEmailRegisteredTrue);
            this.showErrors(this.errors);
          } else {
            this.loading = false;
            this.$router.push("/");
          }
        });
    } else {
      this.loading = false;
      if (this.user.languageName == "") {
        this.errors.push(this.btnLanguage);
        this.showErrors(this.errors);
      }
    }
  }

  mounted() {
    this.translate();
  }

  @Watch("translator")
  translate() {
    this.translator.forEach((term: any) => {
      switch (term.termName) {
        case "registerBtnText": {
          this.registerBtnText = term.termTranslation;
          break;
        }
        case "userFirstNameText": {
          this.userFirstNameText = term.termTranslation;
          break;
        }
        case "userSecondNameText": {
          this.userSecondNameText = term.termTranslation;
          break;
        }
        case "userEmailRegisteredTrue": {
          this.userEmailRegisteredTrue = term.termTranslation;
          break;
        }
        case "btnLanguage": {
          this.btnLanguage = term.termTranslation;
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
        case "userEmailText": {
          this.userEmailText = term.termTranslation;
          break;
        }
        case "userPasswordText": {
          this.userPasswordText = term.termTranslation;
          break;
        }
        case "userNameRulesLength": {
          this.userNameRulesLength = term.termTranslation;
          break;
        }
        case "userNameRulesRequired": {
          this.userNameRulesRequired = term.termTranslation;
          break;
        }
        case "userPasswordRulesLength": {
          this.userPasswordRulesLength = term.termTranslation;
          break;
        }
        case "userPasswordRulesRequired": {
          this.userPasswordRulesRequired = term.termTranslation;
          break;
        }
        case "userEmailRulesRequired": {
          this.userEmailRulesRequired = term.termTranslation;
          break;
        }
        case "userEmailRulesValid": {
          this.userEmailRulesValid = term.termTranslation;
          break;
        }
        case "userBirthdayRulesRequired": {
          this.userBirthdayRulesRequired = term.termTranslation;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get translator() {
    return this.$store.getters["internationalization/getLanguageTexts"];
  }

  get getStatus() {
    return this.$store.getters["signUp/getLoginStatus"];
  }
}
</script>
