<template>
  <v-container>
    <v-row class="">
      <v-col md="5" class="text-center">
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
                    label="Birthday date"
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
      <v-col md="5" class="text-center">
        <SignUpPhoto @imageFiles="imageFile = $event" />
        <SignUpLanguage @languageName="user.languageName = $event" />
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col class="text-center">
        <v-btn
          :disabled="!valid"
          class="white--text"
          color="indigo"
          type="submit"
          @click="signUp"
          >{{ registerBtnText }}</v-btn
        >
      </v-col>
    </v-row>
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

  //PoEditor Terms
  registerBtnText = "Check In";
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  userPasswordText = "Password";

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
    (v: any) => !!v || "Name is required",
    (v: any) => v.length <= 10 || "Name must be less than 10 characters",
  ];

  passwordRules = [
    (v: any) => !!v || "Password is required",
    (v: any) => v.length >= 8 || "Password must be less than 8 characters",
  ];

  emailRules = [
    (v: any) => !!v || "E-mail is required",
    (v: any) => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  birthDateRules = [(v: any) => !!v || "Birthday Date is required"];

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  save(date: Date) {
    this.$refs.menu.save(date);
  }

  signUp() {
    this.$refs.form.validate();
    this.$store.dispatch("signUp/notFederatedSignUp", {
      user: this.user,
      imageFile: this.imageFile,
    });
  }
}
</script>
